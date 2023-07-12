FROM node:14 as build-stage

WORKDIR /workspace/
COPY ./client /workspace/client

RUN npm install -g @vue/cli@4.5.19
RUN npm install -g @vue/cli-service@4.5.19
# RUN npm install --location=global @vue/cli@4.5.19
# RUN npm install --location=global @vue/cli-service@4.5.19

COPY ./client/package* /workspace/

ENV NODE_PATH=/workspace/node_modules
RUN npm install

WORKDIR /workspace/client
RUN npm --depth 20 update caniuse-lite browserslist
RUN npm run build

FROM jsbroks/coco-annotator:python-env

WORKDIR /workspace/
COPY ./backend/ /workspace/
#COPY ./.git /workspace/.git
RUN python set_path.py

COPY --from=build-stage /workspace/client/dist /workspace/dist

RUN apt update && apt install -y libsm6 libxext6 libxrender1

RUN git clone --depth=1 https://github.com/iamlab-cmu/DEXTR-KerasTensorflow.git /tmp/dextr2 && \
           cd /tmp/dextr2 && \
           sed -i "s/from networks/from dextr/g" networks/classifiers.py && \
           sed -i "s/from keras.backend import tf/import tensorflow/g" networks/classifiers.py && \
           sed -i "s/from keras.layers.merge import Concatenate, Add/from keras.layers import concatenate, add/g" networks/classifiers.py && \
            cp networks/classifiers.py /opt/conda/lib/python3.8/site-packages/dextr-0.0.1-py3.8.egg/dextr/ && \
            rm -Rf /tmp/dextr2

ENV FLASK_ENV=production
ENV DEBUG=false

EXPOSE 5000
CMD gunicorn -c webserver/gunicorn_config.py webserver:app --no-sendfile --timeout 180
