import {
    Facebook,
    Instagram,
    MailOutline,
    Phone,
    Pinterest,
    Room,
    Twitter,
  } from "@mui/icons-material";
  import styled from "styled-components";
  import {mobile} from '../responsive';
  
  
  const Container = styled.div`
    display: flex;
    background-color: #06283d;
    color: white;
    ${mobile({ flexDirection: "column" })}
  `;
  
  const Left = styled.div`
    flex: 70%;
    display: flex;
    flex-direction: column;
    padding: 20px;
    /* margin-left: 60px; */
  `;
  
  const Logo = styled.h1``;
  
  const Desc = styled.p`
    margin: 20px 0px;
    padding: 0 39% 0 0;
    ${mobile({ margin:'0px', padding:'0px' })}
  `;
  
  const SocialContainer = styled.div`
    display: flex;
    padding-top: 30px;
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
  `;
  
  // const Center = styled.div`
  // flex: 1;
  // padding: 20px;
  // ${mobile({ display: "none" })}
      
  // `;
  
  const Title = styled.h3`
    margin-bottom: 30px;
  `;
  
  const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
  `;
  
  const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
  `;
  
  const Right = styled.div`
    flex: 30%;
    padding: 20px;
    /* margin-left: 50px; */
 
  `;
  
  const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
  `;
  
  const Payment = styled.img`
      width: 50%;
  `;
  const Bottom=styled.div`
  text-align: center;
  background-color: #06283d;
  color: white;
   flex: 1;
   padding: 10px;
   font-family: "Pacifico";
  `
  const Footer = () => {
    return (
      <>
      <Container>
        <Left>
          <Logo>Book Mart</Logo>
          <Desc>
          A good bookshop is not just about selling books from shelves, but reaching out into the world and making a difference.
          BookMart is committed to the same- spreading joy of reading and learning.</Desc>
          <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
        </Left>
        {/* <Center> */}
          {/* <Title>Quick Links</Title>
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Novels</ListItem>
            <ListItem>Fiction Books</ListItem>
            <ListItem>Self Help</ListItem>
            <ListItem>My Account</ListItem>
            <ListItem>Order Tracking</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Terms</ListItem>
          </List> */}
       
        {/* </Center> */}
        <Right>
          <Title>Contact</Title>
          <ContactItem>
            <Room style={{marginRight:"10px"}}/> 522 Saroj Collony , South Kolkata 
          </ContactItem>
          <ContactItem>
            <Phone style={{marginRight:"10px"}}/> 9834566870
          </ContactItem>
          <ContactItem>
            <MailOutline style={{marginRight:"10px"}} /> contact@book.com
          </ContactItem>
          
          <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
          

        </Right>
        
      </Container>
      <Bottom>Copyright © 2022. All Rights Reserved</Bottom>  
      


</>
    );
  };
  
  export default Footer;