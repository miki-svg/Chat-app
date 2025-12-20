import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTimeShort, formatMessageDate } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

   subscribeToMessages();

    return () => unsubscribeFromMessages();
   
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Group messages by date for date separators
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.createdAt).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4">
        {Object.entries(groupedMessages).map(([dateString, dateMessages]) => {
          const firstMessage = dateMessages[0];
          return (
            <div key={dateString}>
              {/* Date separator */}
              <div className="flex items-center my-4">
                <div className="flex-1 h-px bg-zinc-700"></div>
                <span className="px-3 text-xs text-zinc-400 font-medium">
                  {formatMessageDate(firstMessage.createdAt)}
                </span>
                <div className="flex-1 h-px bg-zinc-700"></div>
              </div>

              {/* Messages for this date */}
              {dateMessages.map((message) => (
                <div
                  key={message._id}
                  className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"} mb-4`}
                >
                  <div className="chat-image avatar">
                    <div className="size-10 rounded-full border border-zinc-700">
                      <img
                        src={
                          message.senderId === authUser._id
                            ? authUser.profilePic || "/avatar.png"
                            : selectedUser.profilePic || "/avatar.png"
                        }
                        alt="profile pic"
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble bg-base-300 text-white relative">
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Attachment"
                        className="max-w-[200px] sm:max-w-[300px] rounded-md mb-2"
                      />
                    )}
                    {message.text && <p className="mb-1">{message.text}</p>}
                    {/* Message timestamp */}
                    <span className="text-[10px] sm:text-xs opacity-60 text-right block mt-1">
                      {formatMessageTimeShort(message.createdAt)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;