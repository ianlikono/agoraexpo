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
  const [selectedForum, setSelectedForum] = useState(null);

  function onTitleChange(e: any) {
    setTitle(e.target.value);
  }

  function onQuillHtmlChange(value: any) {
    setQuillHtml(value);
  }

  function onForumSelected(item, suggestions) {
    let selectedItem = suggestions.filter(sug => (
      sug.name === item
    ))
    setSelectedForum(selectedItem[0]);
  }




  return (
    <>
      <CreatePostContext.Provider value={{ title, onTitleChange, quillHtml, onQuillHtmlChange, selectedForum, onForumSelected }}>
        {children}
      </CreatePostContext.Provider>
    </>
  );
}

const CreatePostConsumer = CreatePostContext.Consumer;

export default CreatePostProvider;
export { CreatePostConsumer };

