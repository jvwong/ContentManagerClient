### *************************************************************************###
### ************************* REMOTE ROUTINES *******************************###
### *************************************************************************###
from __future__ import with_statement
from fabric.contrib.files import exists, sed
from fabric.api import env, local, run

import os

APP_NAME = "growth_rater"
REPO_URL = 'https://github.com/crislar/GrowthRater'

### *************************************************************************###
### ******************** BEGIN DEPLOYMENT ***********************************###
### *************************************************************************###

def deploy(*args, **kwargs):
    base_dir = '/webapps/%s/%s/%s' % (env.user, APP_NAME, env.host)
    app_dir = os.path.abspath(os.path.join(base_dir, "app"))
    deploy_dir = os.path.abspath(os.path.join(app_dir, "deploy"))
    pm2_deploy_file = "{}.json".format(env.host)
    deploy_path = os.path.abspath(os.path.join(deploy_dir, pm2_deploy_file))


    environment = "development"
    if len(args) == 1:
        environment = args[0]

    _create_directory_structure_if_necessary(base_dir)
    _get_latest_source(app_dir)
    _update_packages(app_dir)
    _update_deploy(deploy_path)
    _trigger_grunt_tasks(app_dir, environment)
    _restart_app(deploy_dir, pm2_deploy_file)


def _create_directory_structure_if_necessary(base_dir):
    for subfolder in ('app',):
        run('mkdir -p %s/%s' % (base_dir, subfolder))


def _get_latest_source(app_dir):
    if exists(app_dir + '/.git'):
        run('cd %s && git fetch' % (app_dir,))
    else:
        run('git clone %s %s' % (REPO_URL, app_dir))
    # Get the hash of the local commit; Set the server version to same
    current_commit = local("git log -n 1 --format=%H", capture=True)
    run('cd %s && git reset --hard %s' % (app_dir, current_commit))


def _update_packages(app_dir):
    run('cd %s/ && npm install' % (app_dir,))
    run('cd %s/ && bower install' % (app_dir,))


def _trigger_grunt_tasks(app_dir, environment):
    run('cd %s/ && grunt %s' % (app_dir, environment))


def _update_deploy(deploy_path):
    sed(deploy_path, '<user>', env.user)
    sed(deploy_path, '<app_name>', APP_NAME)
    sed(deploy_path, '<host>', env.host)


def _restart_app(deploy_dir, pm2json):
    run('cd %s/ && pm2 stop %s' % (deploy_dir, pm2json))
    run('cd %s/ && pm2 delete %s' % (deploy_dir, pm2json))
    run('cd %s/ && pm2 start %s' % (deploy_dir, pm2json))


def lgittag():
    local('git tag -f LIVE')
    local('export TAG=`date +DEPLOYED-%F/%H%M`')
    local('git tag $TAG')
    local('git push -f origin $TAG')
    local('git log --graph --oneline --decorate')

### *************************************************************************###
### ************************* END DEPLOYMENT ********************************###
### *************************************************************************###
def api():
    local('test/api/virtualenv/bin/python3.4 -m unittest discover ./test/api/tabs "*_test.py"')
