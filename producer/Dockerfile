FROM python:3.12.1-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./data.json .
COPY ./src .
CMD ["python", "-u", "./producer.py"]
