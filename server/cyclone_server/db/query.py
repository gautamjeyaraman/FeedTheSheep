_INSERT_PATH =\
    'INSERT INTO path (layout_id, path_coords, distance, area)'\
    ' VALUES (%s, %s, %s, %s)'\
    ' RETURNING id'