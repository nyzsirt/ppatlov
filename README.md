# ppatlov
This is foursquare api example and exercise with django

system configuration for centos7:

```
# yum install epel-release
# yum install python-pip python-psycopg2 postgresql-server postgresql-libs postgresql-contrib
# pip install django
# pip install django-datatable
# pip install requests

# postgresql-setup initdb
# vim /var/lib/pgsql/data/pg_hba.conf
# systemctl enable postgresql.service
# systemctl start postgresqş.service
# firewall-cmd --permanent --add-port=5432/tcp
# firewall-cmd --permanent --add-port=80/tcp
# firewall-cmd --reload
# setsebool -P httpd_can_network_connect_db 1
# su - postgres
$ psql
postgresql # \password postgres
postgresql # \q
$ createdb ppatlov
$ createuser ppatlov
$ psql
postgresql # alter user ppatlov with encrypted password 'ppatlov';
postgresql # grant all privileges on database ppatlov to ppatlov;

```
