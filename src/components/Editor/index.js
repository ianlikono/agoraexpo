import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Router from 'next/router';
import React from 'react';
import { Mutation } from 'react-apollo';
import { CreatePostConsumer } from '../../contexts/CreatePost';
import { createForumPostMutation } from '../../graphql/mutations';
import { isAuthenticated } from '../CheckAuth';
import { SubmitButton, SubmitWrapper } from './styles';
import './styles.css';


const styles = theme => ({
  root: {
    width: '60%',
    margin: '2.5rem auto',
  },
  button: {
    width: '20rem',
  }
});


class Editor extends React.PureComponent {
  constructor(props) {
    super(props)
    if (typeof window !== 'undefined') {
      this.ReactQuill = require('react-quill')
    }
  }

   editorOptions = {
    modules: {
      toolbar: {
        container: [
        [{ 'header': '3'}, {'header': '4'},{'header': '5'},{'header': '6'}],
        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
        [{'list': 'ordered'}, {'list': 'bullet'},
         {'indent': '-1'}, {'indent': '+1'}],
        ['link', 'image', 'video'],
        [{ 'color': []}, {'background': []}]
        ['clean']
      ],
      handlers: {
        // handlers object will be merged with default handlers object
        image: async (image, callback)  => {
            var range = this.quillRef.getEditor().getSelection();
            const fileSelector = document.createElement('input');
            fileSelector.setAttribute('type', 'file');
            fileSelector.setAttribute('multiple', 'multiple');
            fileSelector.setAttribute('accept', 'image/*');
            fileSelector.click();
            fileSelector.onchange = async () => {
              const file = fileSelector.files[0];
              const data = new FormData();
              data.append('file', file);
              data.append('upload_preset', 'editorImages');
              const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
                method: 'POST',
                body: data,
              });
              const uploadedFile = await res.json();
              const value = uploadedFile.secure_url;
              if(value) {
                  this.quillRef.getEditor().insertEmbed(range.index, 'image', value, "user");
              }
            };
          }
      }
    },
      clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
      }
    },
    formats: [
      'header', 'font', 'size',
      'bold', 'italic', 'underline', 'strike', 'blockquote','code-block',
      'list', 'bullet', 'indent',
      'link', 'image', 'video'
    ]
  }

  onCreatePostClick = async (postCreate, error, value) => {
    const isLoggedIn = await isAuthenticated();
    if(isLoggedIn) {
      try {
        const response = await postCreate({
          variables: {
            title: value.title,
            content: value.quillHtml,
            type: "POST",
            forumId: value.selectedForum.id,
          }
        })
        Router.push({
          pathname: `/f/${response.data.createForumPost.forum.name}/${response.data.createForumPost.id}`,
        });
      } catch(e) {
        console.log(e);
        console.log(error);
      }
    } else {
      alert('Please Login First')
      Router.push('/auth');
    }
  }


  render() {
    const { classes } = this.props;
    const ReactQuill = this.ReactQuill;
    // const {quillHtml, onQuillHtmlChange} = useContext(CreatePostContext);
    if (typeof window !== 'undefined' && ReactQuill) {
      return (
        <Mutation mutation={createForumPostMutation}>
          {(postCreate, { loading, error }) => (
            <>
              <CreatePostConsumer>
                {value => {
                  const {quillHtml, onQuillHtmlChange, title, selectedForum} = value;
                  const isValid = title.length > 0 && quillHtml.length > 0 && selectedForum;
                  return (
                    <>
                      <ReactQuill theme="snow"
                      ref={(el) => this.quillRef = el}
                      value={quillHtml}
                      onChange={(value) => onQuillHtmlChange(value)}
                      modules={this.editorOptions.modules}
                      formats={this.editorOptions.formats}
                      placeholder="Write Text"
                      />
                      <SubmitWrapper>
                        <SubmitButton>
                          <Button disabled={loading || !isValid} onClick={() => this.onCreatePostClick(postCreate, error, value)} size="large" variant="contained" color="primary" className={classes.button}>
                            Post
                          </Button>
                        </SubmitButton>
                      </SubmitWrapper>
                    </>
                  );
                }}
              </CreatePostConsumer>
              </>
            )}
         </Mutation>
      )
    } else {
      return (
        null
      )
    }
  }
}



export default withStyles(styles)(Editor);
