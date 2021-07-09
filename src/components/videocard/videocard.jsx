import React from "react"
import styled from "styled-components"
import he from "he"


const Title = styled.div`
  font-size: 1.5em;
  margin: auto;
  font-color:black;
  `;

  const Image = styled.img`
  max-width:100%
  `

const CardWrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    height:400px;
    text-align:center
`
function VideoCard({thumbnail,title,url,description,showModal,vidID}){

    if (title.length>50){
        title = title.substring(0,50)+"..."
    }
    return(
        <CardWrapper>
            <Title>
                { he.decode(title)}
            </Title>
            <Title>
            <Image src={thumbnail} alt={description} onClick={()=>{
            showModal({
                    title,
                    url,
                    description,
                    thumbnail,
                    vidID
                })}
            }></Image>
            </Title>
        </CardWrapper>
    )
}

export default VideoCard;