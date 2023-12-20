FROM python:3.12.1
WORKDIR /code
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY ./consumer.py .
CMD ["python", "-u", "./consumer.py"]
