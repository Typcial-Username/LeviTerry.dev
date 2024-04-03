import { NextPage } from "next";
import { Card } from "../components/Card";

const Gallery: NextPage = () => {
  return (
    <div>
      <h1>Gallery</h1>

      <br />

      <div
        className={`grid`}
        style={{ margin: "0 5% 0 5%", gridTemplateColumns: "repeat(4, 1fr)" }}
      >
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
        <Card
          title="DuckBot"
          description={`DuckBot is a multipurpose bot for Discord which allows server owners to help moderate their servers and have fun/increase activity among their members.\n(website coming soon)`}
        />
      </div>
    </div>
  );
};

export default Gallery;
