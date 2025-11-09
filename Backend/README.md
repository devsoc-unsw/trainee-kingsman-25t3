# Backend Installation Guide

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Python 3.13** or higher ([Download here](https://www.python.org/downloads/))
- **Git** ([Download here](https://git-scm.com/downloads))
- **pip** (comes with Python)

To verify your installations:
```bash
python --version  # Should show Python 3.13.x
pip --version
git --version
```

## Installation Steps

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd Backend
```

### 2. Create a Virtual Environment

A virtual environment keeps your project dependencies isolated from other Python projects.

```bash
python -m venv .venv
```

### 3. Activate the Virtual Environment

**Windows (Git Bash/PowerShell):**
```bash
source .venv/Scripts/activate
```

**Mac/Linux:**
```bash
source .venv/bin/activate
```

You should see `(.venv)` at the beginning of your terminal prompt, indicating the virtual environment is active.

### 4. Install Dependencies

With the virtual environment activated, install all required packages:

```bash
pip install -r requirements.txt
```

### 5. Set Up Environment Variables

Create a `.env` file in the project root:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/dbname

# Security
SECRET_KEY=your-secret-key-here
API_KEY=your-api-key-here

# Environment
ENVIRONMENT=development
DEBUG=True
```

### 6. Run the Application

Start the FastAPI development server:

```bash
fastapi dev main.py
```

Or if your main file has a different name:
```bash
fastapi dev <filename>.py
```

**Alternative (using uvicorn directly):**
```bash
uvicorn main:app --reload
```

The API should now be running at:
- **API**: http://localhost:8000
- **Interactive API docs (Swagger)**: http://localhost:8000/docs
- **Alternative API docs (ReDoc)**: http://localhost:8000/redoc

**Note:** For production, use:
```bash
fastapi run main.py
```

## Deactivating the Virtual Environment

When you're done working on the project:

```bash
deactivate
```

## Troubleshooting

### `python: command not found`

If you get this error, Python might not be in your PATH. Try using `py` instead:
```bash
py -m venv .venv
```

Or add Python to your system PATH (see Python installation guide).

### Module Not Found Errors

Make sure your virtual environment is activated (you should see `(.venv)` in your prompt):
```bash
source .venv/Scripts/activate  # Windows
pip install -r requirements.txt
```

### Port Already in Use

If port 8000 is already in use, specify a different port:
```bash
fastapi dev main.py --port 8001
# Or with uvicorn:
uvicorn main:app --reload --port 8001
```

### Permission Errors

On Mac/Linux, you might need to give execute permissions:
```bash
chmod +x .venv/bin/activate
```

## Development Workflow

Every time you work on the project:

1. **Navigate to project directory**
   ```bash
   cd ~/Code/Projects/TP/Backend
   ```

2. **Activate virtual environment**
   ```bash
   source .venv/Scripts/activate
   ```

3. **Start the server**
   ```bash
   fastapi dev main.py
   ```

4. **When done, deactivate**
   ```bash
   deactivate
   ```

## Updating Dependencies

If `requirements.txt` is updated:

```bash
# Make sure virtual environment is activated
pip install -r requirements.txt --upgrade
```

## Generating requirements.txt

If you need to update the requirements file:

```bash
pip freeze > requirements.txt
```

## Additional Resources

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Uvicorn Documentation](https://www.uvicorn.org/)
- [Python Virtual Environments Guide](https://docs.python.org/3/tutorial/venv.html)

## Support

If you encounter any issues not covered here, please:
1. Check the [Issues](link-to-issues) page
2. Create a new issue with details about your problem
3. Include your OS, Python version, and error messages