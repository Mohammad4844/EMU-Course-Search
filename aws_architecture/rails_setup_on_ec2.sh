# 1) Installing dependencies for Ruby:

sudo yum install -y git gcc-c++ glibc-headers openssl-devel readline libyaml-devel readline-devel zlib zlib-devel libffi-devel libxml2 libxslt libxml2-devel libxslt-devel sqlite-devel 

sudo yum install postgresql-devel

# 2) Downloading & extracting Ruby source code:

wget https://cache.ruby-lang.org/pub/ruby/3.1/ruby-3.1.2.tar.gz

tar -xzf ruby-3.1.2.tar.gz

cd ruby-3.1.2

# 3) Configure & install Ruby:

./configure --enable-shared --disable-install-doc

make

sudo make install

# 4) Add Ruby to path:

export PATH=$PATH:/usr/local/bin

# 5) CD out.

cd ..

# 6) Installing Git & Rails: 

sudo yum install git

sudo /usr/local/bin/gem install rails

# 7) Clone the repo and bundle install.

# 8) Run rails server:

rails s -b 0.0.0.0 -p 3000
