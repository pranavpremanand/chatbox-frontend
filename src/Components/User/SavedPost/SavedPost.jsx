import React from 'react'
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import BookmarkRemoveIcon from '@mui/icons-material/BookmarkRemove';
import { Box } from '@mui/material';

const SavedPost = ({post}) => {
    const unsavePost = (postId)=>{
        console.log(postId)
    }
  return (
    // <ImageList sx={{ width: 'auto', maxHeight: '100vh',overflow:'scroll', marginTop:'1rem'}}>
    <Box sx={{width:'45%',marginBottom:'0.5rem',}}>
    <ImageListItem sx={{marginTop:'1rem'}} key="Subheader" cols={2}>
      <ListSubheader component="div" sx={{fontSize:'medium'}}>{post.userId?.fullName}</ListSubheader>
    </ImageListItem>
      <ImageListItem sx={{width:250,height:250,marginBottom:'0.5rem',position:'relative'}} key={post.post.image}>
        <img style={{borderRadius:'10px',objectFit:'cover',width:250,height:250,marginBottom:'0.5rem'}}
          src={`${post.post.image}?w=248&fit=crop&auto=format`}
          srcSet={`${post.post.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
          alt={post.post.image}
          loading="lazy"
        />
        <BookmarkRemoveIcon onClick={()=>unsavePost(post.post._id)} sx={{cursor:'pointer',position:'absolute',background:'white',padding:"2px",borderRadius:'50%',margin:'2px'}}/>
        {/* <ImageListItemBar
          title={post.post.content}
        //   subtitle={post.post.image}
          actionIcon={
            <IconButton
              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
            //   aria-label={`info about ${post.userId.fullName}`}
            >
              <InfoIcon />
            </IconButton>
          }
        /> */}
      </ImageListItem>
      </Box>
//   </ImageList>
  )
}

export default SavedPost

const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
      author: '@bkristastucchio',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
      author: '@rollelflex_graphy726',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
      author: '@helloimnik',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
      author: '@nolanissac',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
      author: '@hjrc33',
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
      author: '@arwinneil',
      rows: 2,
      cols: 2,
      featured: true,
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
      author: '@tjdragotta',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
      author: '@katie_wasserman',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
      author: '@silverdalex',
      rows: 2,
      cols: 2,
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
      author: '@shelleypauls',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
      author: '@peterlaster',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
      author: '@southside_customs',
      cols: 2,
    },
  ];