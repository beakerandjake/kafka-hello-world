FROM python:3.12.1
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./src .
CMD ["python", "-u", "./producer.py"]
