/** @jsx jsx */
import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  Image,
  Link,
  jsx,
} from "theme-ui";

export default function News() {
  const [posts, setPosts] = useState([]);

  async function fetchPosts() {
    const request = await fetch(
      "https://newsapi.org/v2/top-headlines?country=jp&apiKey=0aa02e6d90d64ab885c7a77147c9a541"
    );
    const data = await request.json();
    setPosts(data.articles);
    console.log(data.articles);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <section sx={styles.news} id="news">
      {/* <Container sx={styles.news.container}> */}
      <Flex>
        <Box sx={styles.news.contentBox}>
          <ul
            style={{
              listStyle: "none",
              m: 0,
              px: 3,
              py: 4,
            }}
          >
            {posts.map((post) => (
              <li
                key={post.title}
                style={{
                  mb: 2,
                }}
              >
                <a
                  href={post.url}
                  target="_blank"
                  style={{
                    color: "inherit",
                    cursor: "pointer",
                    textDecoration: "none",
                    // ":hover,:focus": {
                    //   color: "primary",
                    //   textDecoration: "none"
                    // },
                  }}
                >
                  <Flex sx={{ paddingY: 4 }}>
                    <Grid sx={{ marginRight: 2 }}>
                      <h2
                        style={{
                          m: 0,
                          lineHeight: 1.2,
                        }}
                      >
                        {post.title}
                      </h2>
                      <small style={{ fontWeight: "bold" }}>
                        {post.publishedAt}
                      </small>
                    </Grid>
                    <Image src={post.urlToImage} sx={styles.news.imageBox} />
                  </Flex>
                </a>
                <Divider />
              </li>
            ))}
          </ul>
        </Box>
        <Box sx={styles.news.suggestionBox}></Box>
      </Flex>
      {/* </Container> */}
    </section>
  );
}

const styles = {
  news: {
    pt: ["140px", "145px", "155px", "170px", null, null, "180px", "215px"],
    pb: [2, null, 0, null, 2, 0, null, 5],
    position: "relative",
    zIndex: 2,
    "&::before": {
      position: "absolute",
      content: '""',
      bottom: 6,
      left: 0,
      height: "100%",
      width: "100%",
      zIndex: -1,
      // backgroundImage: `url(${ShapeLeft})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: "bottom left",
      backgroundSize: "36%",
    },
    "&::after": {
      position: "absolute",
      content: '""',
      bottom: "40px",
      right: 0,
      height: "100%",
      width: "100%",
      zIndex: -1,
      // backgroundImage: `url(${ShapeRight})`,
      backgroundRepeat: `no-repeat`,
      backgroundPosition: "bottom right",
      backgroundSize: "32%",
    },
    container: {
      minHeight: "inherit",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    contentBox: {
      width: ["100%", "90%", "535px", null, "57%", "60%", "68%", "60%"],
      mx: "auto",
      // textAlign: "center",
      mb: ["40px", null, null, null, null, 7],
    },
    suggestionBox: {
      width: ["300px"],
      // width: ["70%", "40%", "300px", null, "57%", "60%", "68%", "60%"],
      mx: "auto",
      borderLeft: "1px solid #e5e5e5",
      // textAlign: "center",
      mb: ["40px", null, null, null, null, 7],
    },

    imageBox: {
      justifyContent: "center",
      textAlign: "center",
      display: "inline-flex",
      mb: [0, null, -6, null, null, "-40px", null, -3],
      height: "100%",
      maxWidth: 200,
      // img: {
      //   position: "relative",
      //   height: [200, "auto"],
      // },
    },
  },
};
