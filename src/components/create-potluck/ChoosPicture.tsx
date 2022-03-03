import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

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


export default function ChoosePicture({formValues, setFormValues}: ChoosePictureProps) {
    const [selectedPicture, setSelectedPicture] = React.useState('')
    
    const clickPicture =(picName:string) => {
        setSelectedPicture(picName)
        setFormValues({
            ...formValues,
            picture:picName
        })
        console.log(formValues)
    }
  
    return (
    <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={require(`../../images/${item.img}.jpg`)}
            alt={item.title}
            loading="lazy"
            onClick={()=>clickPicture(item.img)}
            //style={{opacity:0.4}}
          />
        </ImageListItem>
      ))}
    </ImageList>
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
  }
];