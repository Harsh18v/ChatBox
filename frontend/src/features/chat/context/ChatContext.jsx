import { createContext, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../auth/context/AuthContext";
import toast from "react-hot-toast";


export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios } = useContext(AuthContext);
    const newMessageHandlerRef = useRef(null)

    // function to get all users for sidebar
    const getUsers = async () => {
        try {
            const { data } = await axios.get("/api/messages/users");
            if (data.success) {
                setUsers(data.users)
                setUnseenMessages(data.unseenMessages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }



    // function to send message to selected user
    const sendMessage = async (messageData) => {
        if (!selectedUser) {
            toast.error("No user selected")
            return
        }
        try {
            const { data } = await axios.post(`/api/messages/send/${selectedUser._id}`, messageData);
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.newMessage])
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = () => {
        if (!socket) return;

        newMessageHandlerRef.current = async (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                try {
                    await axios.put(`/api/messages/mark/${newMessage._id}`);
                } catch (err) {
                    console.error('Failed to mark message seen', err);
                }
            } else {
                setUnseenMessages((prev) => ({
                    ...prev, [newMessage.senderId]: prev[newMessage.senderId] ? prev[newMessage.senderId] + 1 : 1
                }))
            }
        }

        socket.on("newMessage", newMessageHandlerRef.current);
    }

    // function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket && newMessageHandlerRef.current) {
            socket.off("newMessage", newMessageHandlerRef.current);
            newMessageHandlerRef.current = null
        }
    }

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser])


    useEffect(() => {
        if (selectedUser) {
            getMessages(selectedUser._id)
        } else {
            setMessages([])
        }
    }, [selectedUser])


    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage, setSelectedUser, unseenMessages, setUnseenMessages
    }


    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}