import React from "react"
import styled from "styled-components"



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
function VideoCard({thumbnail,title,url,description}){
    return(
        <CardWrapper>
            <Title>
                {title}
            </Title>
            <Title>
            <a href= {url?`https://www.youtube.com/watch?v=${url}`:null} >
            <Image src={thumbnail} alt={description}></Image></a>
            </Title>
        </CardWrapper>
    )
}

export default VideoCard;