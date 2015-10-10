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