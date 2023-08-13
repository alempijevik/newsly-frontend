import React, { useState, useEffect } from "react";
import { Container, CircularProgress, Box } from "@mui/material";
import axiosInstance from "../services/axiosConfig";
import ArticleCard from "./ArticleCard";
import NavBar from "./NavBar";

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchArticles = async (filters) => {
    try {
      const response = await axiosInstance.get(`/api/articles`, {
        params: filters,
      });
      console.log(response.data.articles)
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
    }
  };

  const handleSearch = (filters) => {
    console.log("Filters from Navbar:", filters);
    fetchArticles(filters);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container>
      <NavBar onSearch={handleSearch}></NavBar>
      <Box mt={13}>
        {articles.map((article, index) => (
          <ArticleCard key={index} article={article} />
        ))}
      </Box>
    </Container>
  );
};

export default Home;
