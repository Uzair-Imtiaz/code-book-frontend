import React, { useContext, createContext, useState } from 'react';

const MessageContext = createContext();

/**
 * MessageProvider component is a context provider that wraps its children
 * and provides the message state and setMessage function to its descendants.
 * @param {object} children - The child components to be wrapped by this provider.
 */
export const MessageProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      { children }
    </MessageContext.Provider>
  );
};

/**
 * useMessage is a custom hook that allows components to access the message
 * state and setMessage function from the MessageContext.
 * @returns {object} - An object containing the message state and setMessage function.
 */
export const useMessage = () => {
  return useContext(MessageContext);
};
