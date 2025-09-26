#!/usr/bin/env python3

import requests
import json

def test_api():
    base_url = "http://localhost:3001"
    
    # Test health endpoint
    try:
        response = requests.get(f"{base_url}/health", timeout=5)
        print(f"Health check: {response.status_code}")
        if response.status_code == 200:
            print(f"Response: {response.json()}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Health check failed: {e}")
    
    # Test users endpoint
    try:
        response = requests.get(f"{base_url}/users", timeout=5)
        print(f"Users endpoint: {response.status_code}")
        if response.status_code == 200:
            print(f"Users: {response.json()}")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Users endpoint failed: {e}")
    
    # Test lyrics endpoint
    try:
        response = requests.get(f"{base_url}/lyrics?banda=Coldplay&musica=Yellow", timeout=5)
        print(f"Lyrics endpoint: {response.status_code}")
        if response.status_code == 200:
            data = response.json()
            print(f"Found lyrics for {data['banda']} - {data['musica']}")
            print(f"Lyrics preview: {data['letra'][:100]}...")
        else:
            print(f"Error: {response.text}")
    except Exception as e:
        print(f"Lyrics endpoint failed: {e}")

if __name__ == "__main__":
    test_api()