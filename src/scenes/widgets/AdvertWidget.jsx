import { Typography, useTheme } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";

const AdvertWidget = () => {
  const { palette } = useTheme();
  const dark = palette.neutral.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  return (
    <WidgetWrapper>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://social-mernback-1.onrender.com/assets/info4.jpeg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>MikaCosmetics</Typography>
      </FlexBetween>
      <Typography color={medium}><a href="https://www.instagram.com/mikacosmetics_/?hl=en" style={{ textDecoration: 'none' }}>MikaCosmetics.com</a></Typography>
      <Typography color={medium} m="0.5rem 0">
        Your pathway to stunning and immaculate beauty and made sure your skin
        is exfoliating skin and shining like light.
      </Typography>
      <br></br>
      <FlexBetween>
        <Typography color={dark} variant="h5" fontWeight="500">
          Sponsored
        </Typography>
      </FlexBetween>
      <img
        width="100%"
        height="auto"
        alt="advert"
        src="https://social-mernback-1.onrender.com/assets/maxresdefault.jpg"
        style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
      />
      <FlexBetween>
        <Typography color={main}>Coco Cola</Typography>
      </FlexBetween>
      <Typography color={medium}><a href="https://www.coca-colacompany.com/" style={{ textDecoration: 'none' }}>coca-colacompany.com</a></Typography>
      <Typography color={medium} m="0.5rem 0">
          Depicting an angel emerging from the vivid and widely recognizable shape of a Coke bottle, 
          surrounded by hearts and filigree worked swirls.
      </Typography>
    </WidgetWrapper>

    
  );
};

export default AdvertWidget;