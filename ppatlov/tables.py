from table import Table
from table.columns import Column


class ForsquareResult(Table):
    name = Column(field='name')
    phone_number = Column(field='phone_number')
    checkin_count = Column(field='checkin_count')
