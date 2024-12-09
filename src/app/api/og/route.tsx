/* eslint-disable jsx-a11y/alt-text */

/* eslint-enable jsx-a11y/alt-text */
import Image from "next/image";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const hasTitle = searchParams.has("title");
  const title = hasTitle ? searchParams.get("title") : "Cardano API";

  // Fetch the Roboto font
  const fontData = await fetch(
    "https://fonts.gstatic.com/s/roboto/v30/KFOmCnqEu92Fr1Me5Q.ttf"
  ).then((res) => res.arrayBuffer());

  // Fetch the image and convert to base64
  const imageBuffer = await fetch(
    new URL("../../../../public/images/cardanoapi.png", import.meta.url)
  ).then((res) => res.arrayBuffer());

  const imageBase64 = `data:image/png;base64,${Buffer.from(
    imageBuffer
  ).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Arial', sans-serif",
          backgroundColor: "#bcd7e5",
        }}
      >
        <Image
          src={imageBase64}
          alt="Cardano API"
          style={{
            width: "200px",
            height: "200px",
            marginTop: "20px",
            borderRadius: "50%",
          }}
        ></Image>
        <div tw="flex flex-col px-4">
          <h1 style={{ fontSize: "48px", fontWeight: "bold", margin: "0" }}>
            {title}
          </h1>

          <p
            style={{ fontSize: "24px", fontWeight: "bold", marginTop: "20px" }}
          >
            Explore a list of Cardano API Projects
          </p>
        </div>
      </div>
    ),
    {
      width: 800,
      height: 600, // Adjust size as needed
      fonts: [
        {
          name: "Roboto",
          data: fontData,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
