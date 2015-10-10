import query
import json


class PostgresDatabase(object):
    def __init__(self, connection):
        self.connection = connection

    def insert_path(path, layout_id, distance, area):
        return self.connection.runQuery(
            query._INSERT_PATH, (layout_id, json.dumps(path), distance, area))