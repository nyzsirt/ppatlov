from table import Table
from table.columns import Column


class ForsquareResult(Table):
    name = Column(
        field='name',
        header="Name"
    )

    phone_number = Column(
        field='phone_number',
        header="Phone Number"
    )

    checkin_count = Column(
        field='checkin_count',
        header="Checkin Count"
    )



