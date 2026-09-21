import fs from "fs";
import path from "path";
import type { Plugin } from "vite";

const CMS_USER = "mhrm@dev.com";
const CMS_PASS = "7083";

export default function cmsPlugin(): Plugin {
  return {
    name: "vite-plugin-cms",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/api/admin")) {
          return next();
        }

        // Parse body for POST requests
        let body = "";
        req.on("data", (chunk) => {
          body += chunk.toString();
        });

        req.on("end", () => {
          const parsedBody = body ? JSON.parse(body) : {};

          res.setHeader("Content-Type", "application/json");

          // Basic Auth Check Route
          if (req.url === "/api/admin/login" && req.method === "POST") {
            const { email, password } = parsedBody;
            if (email === CMS_USER && password === CMS_PASS) {
              res.statusCode = 200;
              return res.end(JSON.stringify({ success: true, token: "local-admin-token" }));
            }
            res.statusCode = 401;
            return res.end(JSON.stringify({ success: false, message: "Credenciales inválidas" }));
          }

          // Translations GET
          if (req.url === "/api/admin/translations" && req.method === "GET") {
            try {
              const enPath = path.resolve(__dirname, "./src/i18n/messages/namespaces/common/en.json");
              const content = fs.readFileSync(enPath, "utf-8");
              return res.end(JSON.stringify({ success: true, data: JSON.parse(content) }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Translations POST
          if (req.url === "/api/admin/translations" && req.method === "POST") {
            try {
              const enPath = path.resolve(__dirname, "./src/i18n/messages/namespaces/common/en.json");
              fs.writeFileSync(enPath, JSON.stringify(parsedBody.data, null, 2), "utf-8");
              return res.end(JSON.stringify({ success: true }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Projects GET
          if (req.url === "/api/admin/projects" && req.method === "GET") {
            try {
              const dirPath = path.resolve(__dirname, "./src/content/projects/en");
              const files = fs.readdirSync(dirPath).filter((f) => f.endsWith(".ts") && f !== "index.ts");
              
              // Load previews En to get the short description
              const previewEnPath = path.resolve(__dirname, `./src/content/projects/previews/en.ts`);
              let previewEn = "";
              if (fs.existsSync(previewEnPath)) {
                previewEn = fs.readFileSync(previewEnPath, "utf-8");
              }

              const projects = files.map((file) => {
                const id = file.replace(".ts", "");
                const content = fs.readFileSync(path.join(dirPath, file), "utf-8");
                const titleMatch = content.match(/title:\s*["'](.*?)["']/);
                const descMatch = content.match(/description:\s*(["'`])([\s\S]*?)\1/);
                const liveMatch = content.match(/live:\s*["'](.*?)["']/);
                const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
                let tags: string[] = [];
                if (tagsMatch && tagsMatch[1]) {
                   tags = tagsMatch[1].split(',').map(t => t.trim().replace(/^['"]|['"]$/g, '')).filter(Boolean);
                }
                
                let previewDescription = "";
                const previewBlockMatch = previewEn.match(new RegExp(`{[^{}]*?slug:\\s*["']${id}["'][^{}]*?}`));
                if (previewBlockMatch) {
                   const descInsideBlock = previewBlockMatch[0].match(/description:\s*["'](.*?)["']/);
                   if (descInsideBlock) previewDescription = descInsideBlock[1];
                }

                return {
                  id,
                  title: titleMatch ? titleMatch[1] : "",
                  description: descMatch ? descMatch[2] : "",
                  previewDescription,
                  live: liveMatch ? liveMatch[1] : "",
                  tags: tags,
                };
              });

              return res.end(JSON.stringify({ success: true, projects }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Projects POST
          if (req.url === "/api/admin/projects" && req.method === "POST") {
            try {
              const { id, title, description, live, tags } = parsedBody;
              const filePath = path.resolve(__dirname, `./src/content/projects/en/${id}.ts`);
              let content = fs.readFileSync(filePath, "utf-8");
              
              // Replace title
              content = content.replace(/title:\s*["'].*?["']/, `title: "${title.replace(/"/g, '\\"')}"`);
              
              // Replace description
              content = content.replace(/description:\s*(["'`])[\s\S]*?\1/, `description:\n    "${description.replace(/"/g, '\\"')}"`);
              
              // Replace live
              if (live !== undefined) {
                 if (content.match(/live:\s*["'].*?["']/)) {
                   content = content.replace(/live:\s*["'].*?["']/, `live: "${live}"`);
                 } else if (live.trim() !== "") {
                   content = content.replace(/(title:\s*["'].*?["'],)/, `$1\n  live: "${live}",`);
                 }
              }
              
              // Replace tags
              if (tags !== undefined && Array.isArray(tags)) {
                 const tagsString = tags.map((t: string) => `"${t.trim()}"`).join(", ");
                 if (content.match(/tags:\s*\[.*?\]/)) {
                   content = content.replace(/tags:\s*\[.*?\]/, `tags: [${tagsString}]`);
                 } else {
                   content = content.replace(/(title:\s*["'].*?["'],)/, `$1\n  tags: [${tagsString}],`);
                 }
              }

              // Replace image captions
              if (parsedBody.images && Array.isArray(parsedBody.images)) {
                  parsedBody.images.forEach((img: any) => {
                      if (img.caption !== undefined) {
                         const importRegex = new RegExp(`import\\s+(\\w+)\\s+from\\s+["'][^"']*${img.filename}["']`);
                         const importMatch = content.match(importRegex);
                         if (importMatch) {
                             const varName = importMatch[1];
                             let blockRegex = new RegExp(`({\\s*type:\\s*["']media["'][\\s\\S]*?src:\\s*${varName}[\\s\\S]*?caption:\\s*["'])(.*?)(["'])`);
                             content = content.replace(blockRegex, `$1${img.caption.replace(/"/g, '\\"')}$3`);
                             
                             let altRegex = new RegExp(`({\\s*type:\\s*["']media["'][\\s\\S]*?src:\\s*${varName}[\\s\\S]*?alt:\\s*["'])(.*?)(["'])`);
                             content = content.replace(altRegex, `$1${img.caption.replace(/"/g, '\\"')}$3`);
                         }
                      }
                  });
              }
              
              fs.writeFileSync(filePath, content, "utf-8");
              
              // Update title and description in previews
              const previewEnPath = path.resolve(__dirname, `./src/content/projects/previews/en.ts`);
              if (fs.existsSync(previewEnPath)) {
                let previewEn = fs.readFileSync(previewEnPath, "utf-8");
                const blockRegexEn = new RegExp(`({[^{}]*?slug:\\s*["']${id}["'][^{}]*?})`, 'g');
                previewEn = previewEn.replace(blockRegexEn, (match) => {
                   let updated = match.replace(/title:\s*["'].*?["']/, `title: "${title.replace(/"/g, '\\"')}"`);
                   if (parsedBody.previewDescription) {
                      updated = updated.replace(/description:\s*["'].*?["']/, `description: "${parsedBody.previewDescription.replace(/"/g, '\\"')}"`);
                   }
                   return updated;
                });
                fs.writeFileSync(previewEnPath, previewEn, "utf-8");
              }

              const previewDePath = path.resolve(__dirname, `./src/content/projects/previews/de.ts`);
              if (fs.existsSync(previewDePath)) {
                let previewDe = fs.readFileSync(previewDePath, "utf-8");
                const blockRegexDe = new RegExp(`({[^{}]*?slug:\\s*["']${id}["'][^{}]*?})`, 'g');
                previewDe = previewDe.replace(blockRegexDe, (match) => {
                   let updated = match.replace(/title:\s*["'].*?["']/, `title: "${title.replace(/"/g, '\\"')}"`);
                   if (parsedBody.previewDescription) {
                      updated = updated.replace(/description:\s*["'].*?["']/, `description: "${parsedBody.previewDescription.replace(/"/g, '\\"')}"`);
                   }
                   return updated;
                });
                fs.writeFileSync(previewDePath, previewDe, "utf-8");
              }

              return res.end(JSON.stringify({ success: true }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Images GET
          if (req.url?.startsWith("/api/admin/images") && req.method === "GET") {
            try {
              const url = new URL(req.url, `http://${req.headers.host}`);
              const project = url.searchParams.get("project");
              if (!project) throw new Error("Missing project param");

              const dirPath = path.resolve(__dirname, `./src/assets/images/projects/${project}`);
              let images: any[] = [];
              if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath).filter((f) => f.match(/\.(png|jpe?g|webp|gif)$/i));
                
                const projectTsPath = path.resolve(__dirname, `./src/content/projects/en/${project}.ts`);
                let tsContent = "";
                if (fs.existsSync(projectTsPath)) {
                   tsContent = fs.readFileSync(projectTsPath, "utf-8");
                }

                images = files.map(file => {
                   let caption = "";
                   const importRegex = new RegExp(`import\\s+(\\w+)\\s+from\\s+["'][^"']*${file}["']`);
                   const importMatch = tsContent.match(importRegex);
                   if (importMatch) {
                      const varName = importMatch[1];
                      const blockRegex = new RegExp(`src:\\s*${varName}[\\s\\S]*?caption:\\s*["'](.*?)["']`);
                      const blockMatch = tsContent.match(blockRegex);
                      if (blockMatch) {
                         caption = blockMatch[1];
                      } else {
                         const blockRegex2 = new RegExp(`caption:\\s*["'](.*?)["'][\\s\\S]*?src:\\s*${varName}`);
                         const blockMatch2 = tsContent.match(blockRegex2);
                         if (blockMatch2) caption = blockMatch2[1];
                      }
                   }
                   return { filename: file, caption };
                });
              }
              
              return res.end(JSON.stringify({ success: true, images }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Image POST (Upload)
          if (req.url === "/api/admin/upload-image" && req.method === "POST") {
            try {
              const { project, filename, base64 } = parsedBody;
              if (!project || !filename || !base64) throw new Error("Faltan datos de la imagen");

              // Extract the base64 data (remove "data:image/webp;base64," prefix)
              const base64Data = base64.replace(/^data:image\/\w+;base64,/, "");
              const buffer = Buffer.from(base64Data, "base64");

              const dirPath = path.resolve(__dirname, `./src/assets/images/projects/${project}`);
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
              const filePath = path.join(dirPath, filename);
              
              fs.writeFileSync(filePath, buffer);
              
              return res.end(JSON.stringify({ success: true }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          // Video POST (Upload)
          if (req.url === "/api/admin/upload-video" && req.method === "POST") {
            try {
              const { project, base64 } = parsedBody;
              if (!project || !base64) throw new Error("Faltan datos del video");

              const base64Data = base64.replace(/^data:video\/\w+;base64,/, "");
              const buffer = Buffer.from(base64Data, "base64");

              const dirPath = path.resolve(__dirname, `./src/assets/videos`);
              if (!fs.existsSync(dirPath)) {
                fs.mkdirSync(dirPath, { recursive: true });
              }
              const filePath = path.join(dirPath, `${project}.mp4`);
              
              fs.writeFileSync(filePath, buffer);
              
              return res.end(JSON.stringify({ success: true }));
            } catch (error: any) {
              res.statusCode = 500;
              return res.end(JSON.stringify({ success: false, error: error.message }));
            }
          }

          res.statusCode = 404;
          return res.end(JSON.stringify({ success: false, message: "Ruta no encontrada" }));
        });
      });
    },
  };
}
