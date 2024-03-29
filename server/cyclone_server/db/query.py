_INSERT_PATH =\
    'INSERT INTO path (layout_id, path_coords, distance, area)'\
    ' VALUES (%s, %s, %s, %s)'\
    ' RETURNING id'

_INSERT_LAYOUT =\
    'INSERT INTO layout (layout)'\
    ' VALUES (%s)'\
    ' RETURNING id'

_RM_LAYOUT =\
	'DELETE FROM layout RETURNING *;'

_GET_ALL_LAYOUT_IDS =\
	'SELECT id FROM layout;'

_GET_LAYOUT =\
	'SELECT layout FROM layout WHERE id=%s;'

_GET_PATH =\
	'SELECT * FROM path WHERE layout_id=%s;'
_UPDATE_PATH =\
    'UPDATE path set path_coords=%s, distance=%s, area=%s WHERE layout_id=%s'\
    ' RETURNING id'