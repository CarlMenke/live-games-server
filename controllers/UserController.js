const { User, UserFriendRequests, UserFriends } = require('../models');
const middleware = require('../middleware');

const signup = async (req, res) => {
  try {
    if (!req.body.name || req.body.name === '') {
      return res.send({ message: 'Must Enter a Name' });
    }
    if (!req.body.password || req.body.password === '') {
      return res.send({ message: 'Must Enter a Password' });
    }
    const exists = await User.findOne({
      where: {
        name: req.body.name
      },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        }
      ]
    });
    if (!exists) {
      const { name, password } = req.body;
      let hashedPassword = await middleware.hashPassword(password);
      const user = await User.create({
        name: name,
        password: hashedPassword,
        socket: 'Not Yet Connected'
      });
      let payload = {
        id: user.id,
        name: user.name
      };
      let token = middleware.createToken(payload);
      res.send({
        user: user,
        token,
        login: true,
        message: `Welcome ${user.name}`
      });
    } else {
      res.send({ login: false, message: 'Name Already In Use, Try Again' });
    }
  } catch (error) {
    throw error;
  }
};
const login = async (req, res) => {
  try {
    if (!req.body.name || req.body.name === '') {
      return res.send({ message: 'Must Enter a Name' });
    }
    if (!req.body.password || req.body.password === '') {
      return res.send({ message: 'Must Enter a Password' });
    }
    const user = await User.findOne({
      where: {
        name: req.body.name
      },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        },
        {
          model: User,
          as: 'friend',
          through: UserFriends
        }
      ]
    });
    if (
      user &&
      (await middleware.comparePassword(user.password, req.body.password))
    ) {
      let payload = {
        id: user.id,
        name: user.name
      };
      let token = middleware.createToken(payload);
      res.send({
        user: user,
        token,
        login: true,
        message: `Welcome ${user.name}`
      });
    } else {
      res.send({
        login: false,
        message: 'Incorrect Password or Name'
      });
    }
  } catch (error) {
    throw error;
  }
};
const UpdateSocketId = async (req, res) => {
  try {
    console.log(req);
    let user = await User.findOne({
      where: { name: req.body.name },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        },
        {
          model: User,
          as: 'friend',
          through: UserFriends
        }
      ]
    });
    user.set({ socket: req.body.socket });
    user = await user.save();
    res.send(user);
  } catch (error) {
    throw error;
  }
};
const DeleteUser = async (req, res) => {
  try {
    const result = await User.destroy({ where: { id: req.params.id } });
    res.send({ message: 'Deleted User', response: result });
  } catch (error) {
    throw error;
  }
};
const GetUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.body.userId
      },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        },
        {
          model: User,
          as: 'friend',
          through: UserFriends
        }
      ]
    });
    res.send(user);
  } catch (error) {
    throw error;
  }
};
const GetSocketFromName = async (req, res) => {
  try {
    console.log(req.body);
    const user = await User.findOne({
      where: {
        name: req.body.name
      },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        },
        {
          model: User,
          as: 'friend',
          through: UserFriends
        }
      ]
    });
    console.log(user);
    res.send(user ? user.socket : { message: 'User Not Found' });
  } catch (error) {
    throw error;
  }
};
const SendFriendRequest = async (req, res) => {
  try {
    const { senderId, recieverName } = req.body;
    const user = await User.findOne({
      where: { name: recieverName }
    });
    console.log('user!!!!!!', user);
    if (!user) {
      res.send({ message: 'User Not Found' });
    } else {
      const check1 = await UserFriendRequests.findOne({
        where: { userId: senderId, friendId: user.id }
      });
      const check2 = await UserFriends.findOne({
        where: { userId: senderId, friendId: user.id }
      });
      if (check1) {
        res.send({ message: 'Request Pending' });
      } else if (check2) {
        res.send({ message: 'Already Friends' });
      } else {
        const request = await UserFriendRequests.create({
          userId: senderId,
          friendId: user.id
        });
        console.log('request !!!!!', request);
        const sendingUser = await User.findOne({
          where: {
            id: senderId
          },
          include: [
            {
              model: User,
              as: 'friendrequestrecieved',
              through: UserFriendRequests
            },
            {
              model: User,
              as: 'friend',
              through: UserFriends
            }
          ]
        });
        console.log('sending user', sendingUser);
        res.send({
          user: sendingUser,
          message: `Friend Request Sent To ${recieverName}`
        });
      }
    }
  } catch (error) {
    throw error;
  }
};
const FriendRequestResponse = async (req, res) => {
  try {
    const { userId, friendId, choice } = req.body;
    await UserFriendRequests.destroy({
      where: { userId: userId, friendId: friendId }
    });
    const user = await User.findOne({
      where: {
        id: friendId
      },
      include: [
        {
          model: User,
          as: 'friendrequestrecieved',
          through: UserFriendRequests
        },
        {
          model: User,
          as: 'friend',
          through: UserFriends
        }
      ]
    });
    if (choice) {
      await UserFriends.create({ userId: userId, friendId: friendId });
      await UserFriends.create({ userId: friendId, friendId: userId });
      res.send({ user: user });
    } else {
      res.send({ message: `request denied.` });
    }
  } catch (error) {
    throw error;
  }
};
const OpenChat = async (req, res) => {
  try {
    let user = await User.findOne({
      where: {
        id: req.body.userId
      }
    });
    console.log(user);
    user.set({ open_chat_with: req.body.chatterName });
    user = await user.save();
    res.send(user);
  } catch (error) {
    throw error;
  }
};
module.exports = {
  signup,
  DeleteUser,
  GetUserDetails,
  login,
  UpdateSocketId,
  GetSocketFromName,
  SendFriendRequest,
  FriendRequestResponse,
  OpenChat
};
