FROM python:3.12.1-slim
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./data.json .
COPY ./producer.py .
CMD ["python", "./producer.py"]
