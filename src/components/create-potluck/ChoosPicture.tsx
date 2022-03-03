import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { styled } from '@mui/material/styles';

interface ChoosePictureProps{
    setFormValues:Function,
    formValues:{
         event_name: string,
         description: string,
         event_date: string,
         event_time: string,
         address:string,
         city:string,
         state:string,
         zip:string, 
         picture:string
    }
}

const Root = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    height:500, width:425,
  },
  [theme.breakpoints.up('sm')]: {
    width: 500, height: 500
  },
}));


export default function ChoosePicture({formValues, setFormValues}: ChoosePictureProps) {
    const [selectedPicture, setSelectedPicture] = React.useState('')
    
    const clickPicture =(picName:string) => {
        setSelectedPicture(picName)
        setFormValues({
            ...formValues,
            picture:picName
        })
       
    }
  
    return (
      <Root>
       <ImageList cols={3} rowHeight={164}>
        {itemData.map(item => {
            if(item.img === selectedPicture){
            return <ImageListItem key={item.img}>
                    <img
                        src={require(`../../images/${item.img}.jpg`)}
                        alt={item.title}
                        loading="lazy"
                        onClick={()=>clickPicture(item.img)}
                        style={{opacity:0.4}}
                />
                </ImageListItem>
            } else {
            return <ImageListItem key={item.img}>
                    <img
                        src={require(`../../images/${item.img}.jpg`)}
                        alt={item.title}
                        loading="lazy"
                        onClick={()=>clickPicture(item.img)}
                />
                </ImageListItem>
            }
        }
           
      )}
    </ImageList>
    </Root>
  );
}

const itemData = [
  {
    img: 'food2',
    title: 'Breakfast',
  },
  {
    img: 'food3',
    title: 'Breakfast',
  },
  {
    img: 'food4',
    title: 'Breakfast',
  },
  {
    img: 'food5',
    title: 'Breakfast',
  },
  {
    img: 'food6',
    title: 'Breakfast',
  },
  {
    img: 'food7',
    title: 'Breakfast',
  },
  {
    img: 'food8',
    title: 'Breakfast',
  },
  {
    img: 'food9',
    title: 'Breakfast',
  },
  {
    img: 'food10',
    title: 'Breakfast',
  },
];