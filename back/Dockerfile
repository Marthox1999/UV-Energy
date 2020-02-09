FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY entrypoint.sh /entrypoint.sh
COPY requirements.txt /code/
COPY . /code/
RUN pip install -r requirements.txt
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["sh","/entrypoint.sh" ]