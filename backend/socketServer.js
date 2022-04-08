let users = [];

const socketServer = (socket) => {
    const addUser = (userId, socketId) => {
        !users.some((user) => user.userId === userId) &&
          users.push({ userId, socketId });
      };
    
      const removeUser = (socketId) => {
        users = users.filter((user) => user.socketId !== socketId);
      };
    
      const getUser = (userId) => {
        return users.find((user) => user.userId === userId);
      };
    
 
  socket.on("addUsers", (userId) => {
    addUser(userId, socket.id);
    socket.emit("getUsers", users);
  });
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    socket.emit("getUsers", users);
  });

};

export default socketServer;
