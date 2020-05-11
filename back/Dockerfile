FROM python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /code

WORKDIR /code

COPY entrypoint.sh /entrypoint.sh
COPY requirements.txt /code/
COPY . /code/

RUN curl -L#o wk.tar.xz https://downloads.wkhtmltopdf.org/0.12/0.12.4/wkhtmltox-0.12.4_linux-generic-amd64.tar.xz \
    && tar xf wk.tar.xz \
    && cp wkhtmltox/bin/wkhtmltopdf /usr/bin \
    && cp wkhtmltox/bin/wkhtmltoimage /usr/bin \
    && rm wk.tar.xz \
    && rm -r wkhtmltox

RUN pip install -r requirements.txt
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["sh","/entrypoint.sh" ]