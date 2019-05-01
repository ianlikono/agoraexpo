import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import { DropzoneArea } from 'material-ui-dropzone';
import Router from 'next/router';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import ForumHeader from '../src/components/Forum/ForumHeader';
import Input from '../src/components/Input';
import { createForumMutation } from '../src/graphql/mutations';

const defaultAvatarPic = "https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_500,q_auto,w_500/v1556402297/defaults/no-image.webp";
const defaultCoverPic = "https://res.cloudinary.com/doelo01na/image/upload/c_scale,h_600,q_auto,w_1500/v1556402297/defaults/no-image.webp";


const Wrapper = styled.div`
  width: 70%;
  margin: 1.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Header = styled.h1`
  font-size: 2.3rem;
  font-weight: bold;
  flex: 1 1 0%;
  border-bottom: 1px solid #fff;
`;
const Header2 = styled.h1`
  font-size: 2rem;
  flex: 1 1 0%;
  border-bottom: 1px solid #fff;
`;

const AvatarImageUpload = styled.div`
  width: 50%;
`;
const CoverImageUpload = styled.div`
  width: 100%;
`;

const SubmitWrapper = styled.div`
  position: relative;
  margin-top: 2rem;
`;

const SubmitButton = styled.div`
  /* position: absolute; */
  margin: 0 auto;
  right: 0;
`;

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    width: '20rem',
  }
});


export interface CreateForumProps {
  classes: any;
 }

function NewForumPage(props: CreateForumProps) {
  const { classes } = props;
  const [forumName, setForumName] = useState("")
  const [forumDescription, setForumDescription] = useState("")
  const [coverUrl, setCoverUrl] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")

  function onForumNameChange(e) {
    setForumName(e.target.value);
  }
  function onForumDescriptionChange(e) {
    setForumDescription(e.target.value);
  }


  async function onCoverDropped(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'forumCover');

    const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
      method: 'POST',
      body: data,
    });
    const uploadedFile = await res.json();
    setCoverUrl(uploadedFile.secure_url);
  }
  async function onAvatarDropped(file) {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', 'forumAvatar');

    const res = await fetch('https://api.cloudinary.com/v1_1/doelo01na/image/upload', {
      method: 'POST',
      body: data,
    });
    const uploadedFile = await res.json();
    setAvatarUrl(uploadedFile.secure_url);
  }
  async function createForumSubmit(createForum, error) {
    try {
      const response = await createForum({
        variables: {
          name: forumName,
          description: forumDescription,
          avatarPic: avatarUrl.length > 0 ? avatarUrl : defaultAvatarPic,
          coverPic: coverUrl.length > 0 ? coverUrl : defaultCoverPic,
        }
      })
      Router.push({
        pathname: `/f/${response.data.createForum.name}`,
      });
    } catch(e) {
      console.log(e);
      console.log(error);
    }
   }

  return (
    <>
    <Helmet
        title='create new forum'
        meta={[{ name: "description", content: "create new agora expo forum" }]}
      />
    <Mutation mutation={createForumMutation}>
          {(createForum, { loading, error }) => (
            <>
              <ForumHeader />
              <Wrapper>
                <Header>Create New Forum</Header>
                <Paper className={classes.root} elevation={1}>
                  <Input placeholder="Enter Forum Name" label="Forum Name" value={forumName} onChange={onForumNameChange}/>
                  <Input placeholder="Enter Forum Description" label="Forum Description" value={forumDescription} onChange={onForumDescriptionChange}/>
                  <Header2>Upload Avatar Image (Optional)</Header2>
                  <AvatarImageUpload>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      filesLimit={1}
                      onDrop={onAvatarDropped}
                      dropzoneText="Drag and drop an image file here or click"
                    />
                  </AvatarImageUpload>
                  <Header2>Upload Cover Image (Optional)</Header2>
                  <CoverImageUpload>
                    <DropzoneArea
                      acceptedFiles={['image/*']}
                      filesLimit={1}
                      onDrop={onCoverDropped}
                      dropzoneText="Drag and drop an image file here or click"
                    />
                  </CoverImageUpload>
                  <SubmitWrapper>
                    <SubmitButton>
                      <Button disabled={loading || forumName.length <= 0} onClick={() => createForumSubmit(createForum, error)} size="large" variant="contained" color="primary" className={classes.button}>
                        Post
                      </Button>
                    </SubmitButton>
                  </SubmitWrapper>
                </Paper>
              </Wrapper>
            </>
          )}
      </Mutation>
    </>
  );
}

export default withStyles(styles)(NewForumPage);

