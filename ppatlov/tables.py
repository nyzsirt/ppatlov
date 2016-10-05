# -*- coding: utf-8 -*-
import sys
from table import Table
from table.columns import Column
reload(sys)
sys.setdefaultencoding('utf-8')

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



