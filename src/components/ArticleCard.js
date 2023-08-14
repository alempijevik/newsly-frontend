import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  Box,
  Link,
} from "@mui/material";

function ArticleCard(props) {
  const { article } = props;
  return (
    <Box mt={5} mb={5}>
      <Card>
        {article.urlToImage && (
          <CardMedia
            component="img"
            height="200"
            image={article.urlToImage}
            alt={article.title}
            loading="lazy"
          />
        )}
        <CardContent>
          <Typography variant="h5" component="div">
            {article.title}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary">
            {article.author} -{" "}
            {new Date(article.publishedAt).toLocaleDateString()}
          </Typography>
          <Typography variant="body2" color="textSecondary" gutterBottom>
            {article.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            <Link
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Read more...
            </Link>
          </Button>
          <Typography
            variant="caption"
            color="textSecondary"
            style={{ marginLeft: "auto" }}
          >
            Source: {article.source.name}
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}

export default ArticleCard;
