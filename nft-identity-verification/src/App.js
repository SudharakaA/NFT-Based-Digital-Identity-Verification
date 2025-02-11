import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box, Alert } from '@mui/material';
import './App.css';

const verifyUser = async (address, setMessage) => {
    const response = await fetch('/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ address })
    });
    const data = await response.json();
    setMessage(data.message || data.error);
};

const checkVerification = async (checkAddress, setIsVerified) => {
    const response = await fetch(`/isVerified/${checkAddress}`);
    const data = await response.json();
    setIsVerified(data.isVerified);
};

function App() {
    const [address, setAddress] = useState('');
    const [checkAddress, setCheckAddress] = useState('');
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState(null);

    return (
        <Container maxWidth="sm">
            <Box textAlign="center" mt={5}>
                <Typography variant="h4" gutterBottom>
                    NFT-Based Digital Identity Verification
                </Typography>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Enter your address"
                        variant="outlined"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" onClick={() => verifyUser(address, setMessage)}>
                        Verify
                    </Button>
                </Box>
                <Box mb={3}>
                    <TextField
                        fullWidth
                        label="Enter address to check"
                        variant="outlined"
                        value={checkAddress}
                        onChange={(e) => setCheckAddress(e.target.value)}
                        margin="normal"
                    />
                    <Button variant="contained" color="secondary" onClick={() => checkVerification(checkAddress, setIsVerified)}>
                        Check Verification
                    </Button>
                </Box>
                {message && <Alert severity="info">{message}</Alert>}
                {isVerified !== null && (
                    <Alert severity={isVerified ? "success" : "error"}>
                        {isVerified ? 'User is verified' : 'User is not verified'}
                    </Alert>
                )}
            </Box>
        </Container>
    );
}

export default App;
