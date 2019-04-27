import React, { useState } from 'react';

export interface CreatePostProps {
  children: any;
}

//@ts-ignore
export const CreatePostContext = React.createContext();


function CreatePostProvider(props: CreatePostProps) {
  const { children } = props;
  const [title, setTitle] = useState("");
  const [quillHtml, setQuillHtml] = useState("");

  function onTitleChange(e: any) {
    setTitle(e.target.value);
  }

  function onQuillHtmlChange(value: any) {
    setQuillHtml(value);
    console.log(quillHtml);
  }
  return (
    <>
      <CreatePostContext.Provider value={{ title, onTitleChange, quillHtml, onQuillHtmlChange }}>
        {children}
      </CreatePostContext.Provider>
    </>
  );
}

const CreatePostConsumer = CreatePostContext.Consumer;

export default CreatePostProvider;
export { CreatePostConsumer };

