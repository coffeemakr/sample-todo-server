import http from "http";

const todos = [
  { id: 1, title: "Learn JavaScript", completed: false },
  { id: 2, title: "Learn Node.js", completed: false },
  { id: 3, title: "Build a simple server", completed: false },
];

const randomDelay = (callback) => {
  const delay = Math.floor(Math.random() * 1000); // Random delay between 0-1000ms
  setTimeout(callback, delay);
};

const server = http.createServer((req, res) => {
  if (req.url === "/todos" && req.method === "GET") {
    randomDelay(() => {
      res.writeHead(200, {
        "Content-Type": "application/json",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
      });
      res.end(JSON.stringify(todos));
    });
  } else if (req.url === "/todos" && req.method === "POST") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      randomDelay(() => {
        const newTask = JSON.parse(body);
        newTask.id = todos.length + 1;
        todos.push(newTask);
        res.writeHead(201, { "Content-Type": "application/json" });
        res.end(JSON.stringify(newTask));
      });
    });
  } else if (req.url.startsWith("/todos/") && req.method === "PUT") {
    const id = parseInt(req.url.split("/")[2]);
    let body = "";
    req.on("data", (chunk) => {
      body += chunk.toString();
    });
    req.on("end", () => {
      randomDelay(() => {
        const updatedTask = JSON.parse(body);
        const index = todos.findIndex((task) => task.id === id);
        if (index !== -1) {
          todos[index] = { ...todos[index], ...updatedTask };
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(todos[index]));
        } else {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: "Task not found" }));
        }
      });
    });
  } else if (req.url.startsWith("/todos/") && req.method === "DELETE") {
    const id = parseInt(req.url.split("/")[2]);
    randomDelay(() => {
      const index = todos.findIndex((task) => task.id === id);
      if (index !== -1) {
        todos.splice(index, 1);
        res.writeHead(204);
        res.end();
      } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ message: "Task not found" }));
      }
    });
  } else if (req.method === "OPTIONS") {
    randomDelay(() => {
      res.writeHead(204, {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      });
      res.end();
    });
  } else {
    randomDelay(() => {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Not Found" }));
    });
  }
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
