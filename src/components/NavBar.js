import React, { useState } from "react";
import {
  Search as SearchIcon,
  ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Toolbar,
  AppBar,
  IconButton,
  TextField,
  Select,
  MenuItem,
  FormControl,
  Slide,
  Button,
  useMediaQuery,
} from "@mui/material";
import { useAuth } from "../contexts/AuthContext";

function Navbar({ onSearch }) {
  const isMobile = useMediaQuery("(max-width:600px)");
  const { setIsAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [filter, setFilter] = useState("q");
  const [searchTerm, setSearchTerm] = useState("");

  const filterTypes = [
    { value: "q", label: "Keyword" },
    { value: "sources", label: "Sources" },
    { value: "category", label: "Category" },
    { value: "country", label: "Country Iso" },
  ];

  const handleSearchClick = () => {
    if (onSearch && typeof onSearch === "function") {
      onSearch({
        filter: filter,
        searchTerm: searchTerm,
      });
    }
  };
  const handleIconClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const filterMenu = () => {
    return (
      <FormControl variant="standard" fullWidth>
        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          fullWidth
        >
          {filterTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <AppBar position="fixed">
      <Toolbar style={{ backgroundColor: "#272727", zIndex: 2 }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Newsly
        </Typography>
        {!isMobile && (
          <Box sx={{ display: "flex", ml: 2 }}>
            {filterMenu()}
            <TextField
              sx={{ pl: 2, color: "inherit" }}
              placeholder="Search…"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              variant="standard"
            />
            <Button onClick={handleSearchClick}>
              <SearchIcon />
            </Button>
          </Box>
        )}
        {isMobile && (
          <IconButton onClick={handleIconClick}>
            <SearchIcon />
          </IconButton>
        )}
        <IconButton color="inherit" onClick={handleLogout} aria-label="logout">
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
      {isMobile && (
        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <Box display="flex" flexDirection="column" gap={2} mt={1} p={1}>
            {filterMenu()}

            <TextField
              variant="standard"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              fullWidth
            />
            <Button
              variant="outlined"
              color="primary"
              onClick={handleSearchClick}
            >
              Search
            </Button>
          </Box>
        </Slide>
      )}
    </AppBar>
  );
}

export default Navbar;
