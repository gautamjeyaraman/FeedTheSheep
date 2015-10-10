import query
import json


class PostgresDatabase(object):
    def __init__(self, connection):
        self.connection = connection

    def insert_path(self, path, layout_id, distance, area):
        return self.connection.runQuery(
            query._INSERT_PATH, (layout_id, json.dumps(path), distance, area))

    def add_layout(self, layout):
    	return self.connection.runQuery(
    		query._INSERT_LAYOUT, (json.dumps(layout), ))

    def rm_all_layout(self):
    	return self.connection.runQuery(
    		query._RM_LAYOUT)