import { Container } from "@mui/material";

export default function Map() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <iframe
        src="http://192.168.1.14:3000"
        width="800px"
        height="640px"
        style={{ border: "none", maxWidth: "100%" }}
        title="Map"
      ></iframe>
    </Container>
  );
}
