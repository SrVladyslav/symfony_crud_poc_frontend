## Getting Started

This server is meant to be used as a local development server for the frontend application with the Symfony API server running on port `8000`, you can change the port in the `.env.local` file.

1. Download the project locally. Go to the [frontend repository](https://github.com/SrVladyslav/symfony_crud_poc_frontend) for this project and clone it to your local machine.

```bash
git clone https://github.com/SrVladyslav/symfony_crud_poc_frontend.git
```

2. Navigate to the project directory and install the required dependencies using npm:

```bash
cd frontend
npm install
```

3. Start the development server and open your browser to `http://localhost:3000/`:

```bash
npm run dev
```

4. You can also create a build for production:

```bash
npm run build
```

5. And then run the build:

```bash
npm run start
```
