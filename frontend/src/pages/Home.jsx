import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import Navbar from "../components/Navbar";

const Home = () => {
    const navigate = useNavigate();
    
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Navbar />
            <Box 
                sx={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                }}
            >
                <div>
                    <Typography variant="h6" gutterBottom>
                        This is the Home page
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        sx={{
                            borderRadius: '20px',
                            padding: '10px 20px',
                            backgroundColor: '#6E6565',
                            '&:hover': { backgroundColor: '#5a5a5a' },
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => navigate('/login')}
                    >
                        Get Notes
                    </Button>
                </div>
            </Box>
        </div>
    );
};

export default Home;
