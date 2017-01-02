Search.setIndex({envversion:49,filenames:["README","docs/_apidoc/modules","docs/_apidoc/sync","docs/_apidoc/sync.controllers","docs/_apidoc/sync.gui","docs/_apidoc/sync.models","docs/_apidoc/sync.resources","docs/source/contributions","docs/source/faq","docs/source/includeme","docs/source/nextsteps","docs/source/specification","docs/source/usermanual","index"],objects:{"":{sync:[2,0,0,"-"]},"sync.auth":{AlreadyAuthenticatedError:[2,1,1,""],AuthenticationError:[2,1,1,""],Authenticator:[2,2,1,""],generate_client_id:[2,4,1,""],generate_client_secret:[2,4,1,""]},"sync.auth.Authenticator":{authenticate_with_client_secret:[2,3,1,""],authenticate_with_password:[2,3,1,""],get_authorization_header:[2,3,1,""],has_client_credentials:[2,3,1,""],init_authenticate:[2,3,1,""],is_authenticated:[2,3,1,""],load_client_data:[2,3,1,""],save_client_data:[2,3,1,""]},"sync.controllers":{account_ctrl:[3,0,0,"-"],localbox_ctrl:[3,0,0,"-"],login_ctrl:[3,0,0,"-"],preferences_ctrl:[3,0,0,"-"]},"sync.controllers.account_ctrl":{AccountController:[3,2,1,""],Preferences:[3,2,1,""]},"sync.controllers.account_ctrl.AccountController":{"delete":[3,3,1,""],add:[3,3,1,""],load:[3,3,1,""],save:[3,3,1,""]},"sync.controllers.localbox_ctrl":{SyncItem:[3,2,1,""],SyncsController:[3,2,1,""],get_localbox_list:[3,4,1,""]},"sync.controllers.localbox_ctrl.SyncItem":{direction:[3,5,1,""],label:[3,5,1,""],path:[3,5,1,""],url:[3,5,1,""],user:[3,5,1,""]},"sync.controllers.localbox_ctrl.SyncsController":{"delete":[3,3,1,""],add:[3,3,1,""],get:[3,3,1,""],instance:[3,5,1,""],list:[3,5,1,""],load:[3,3,1,""],save:[3,3,1,""]},"sync.controllers.login_ctrl":{InvalidPassphraseError:[3,1,1,""],LoginController:[3,2,1,""]},"sync.controllers.login_ctrl.LoginController":{get_passphrase:[3,3,1,""],logged_in:[3,5,1,""],store_keys:[3,3,1,""],store_passphrase:[3,3,1,""]},"sync.controllers.preferences_ctrl":{Preferences:[3,2,1,""],PreferencesController:[3,2,1,""]},"sync.controllers.preferences_ctrl.PreferencesController":{get_language_abbr:[3,3,1,""],instance:[3,5,1,""],load:[3,3,1,""],prefs:[3,5,1,""],save:[3,3,1,""]},"sync.database":{DatabaseError:[2,1,1,""],database_execute:[2,4,1,""],get_sql_log_dict:[2,4,1,""],mysql_execute:[2,4,1,""],sqlite_execute:[2,4,1,""],warning_no_database_section:[2,4,1,""]},"sync.gpg":{gpg:[2,2,1,""]},"sync.gpg.gpg":{add_keypair:[2,3,1,""],add_pkcs7_padding:[2,6,1,""],add_public_key:[2,3,1,""],decrypt:[2,3,1,""],encrypt:[2,3,1,""],generate:[2,3,1,""],get_fingerprint:[2,3,1,""],get_key:[2,3,1,""],has_key:[2,3,1,""],is_passphrase_valid:[2,3,1,""],remove_pkcs7_padding:[2,6,1,""]},"sync.gui":{gui_utils:[4,0,0,"-"],gui_wx:[4,0,0,"-"],taskbar:[4,0,0,"-"],wizard:[4,0,0,"-"]},"sync.gui.gui_utils":{iconpath:[4,4,1,""],images_path:[4,4,1,""],is_valid_input:[4,4,1,""],select_directory:[4,4,1,""],show_confirm_dialog:[4,4,1,""],show_error_dialog:[4,4,1,""]},"sync.gui.gui_wx":{AccountPanel:[4,2,1,""],BottomPanel:[4,2,1,""],FirstLoginPanel:[4,2,1,""],Gui:[4,2,1,""],LocalBoxApp:[4,2,1,""],LocalboxListCtrl:[4,2,1,""],LoginDialog:[4,2,1,""],LoginPanel:[4,2,1,""],LoxListCtrl:[4,2,1,""],NewShareDialog:[4,2,1,""],NewSharePanel:[4,2,1,""],PasshphrasePanel:[4,2,1,""],PassphraseDialog:[4,2,1,""],PreferencesPanel:[4,2,1,""],SharePanel:[4,2,1,""],SharesListCtrl:[4,2,1,""],SyncsPanel:[4,2,1,""],UserListCtrl:[4,2,1,""],ask_passphrase:[4,4,1,""]},"sync.gui.gui_wx.BottomPanel":{ApplyOnClick:[4,3,1,""],CloseOnClick:[4,3,1,""],OnClickOk:[4,3,1,""]},"sync.gui.gui_wx.FirstLoginPanel":{ctrl:[4,5,1,""]},"sync.gui.gui_wx.Gui":{InitUI:[4,3,1,""],OnQuit:[4,3,1,""],OnToolbarLocalboxesClick:[4,3,1,""],add_toolbar:[4,3,1,""],hide_before_login:[4,3,1,""],on_close:[4,3,1,""],on_successful_login:[4,3,1,""],show_first_panels:[4,3,1,""]},"sync.gui.gui_wx.LocalBoxApp":{OnInit:[4,3,1,""]},"sync.gui.gui_wx.LocalboxListCtrl":{"delete":[4,3,1,""],add:[4,3,1,""],populate_list:[4,3,1,""],save:[4,3,1,""]},"sync.gui.gui_wx.LoginPanel":{get_password:[4,3,1,""],get_username:[4,3,1,""]},"sync.gui.gui_wx.LoxListCtrl":{"delete":[4,3,1,""],load:[4,3,1,""],populate:[4,3,1,""],save:[4,3,1,""]},"sync.gui.gui_wx.NewShareDialog":{InitUI:[4,3,1,""],OnClickClose:[4,3,1,""]},"sync.gui.gui_wx.NewSharePanel":{OnChoice:[4,3,1,""],OnClickClose:[4,3,1,""],OnClickOk:[4,3,1,""],localbox_client:[4,5,1,""],localbox_path:[4,5,1,""],on_populate:[4,3,1,""],select_dir:[4,3,1,""],selected_localbox:[4,5,1,""]},"sync.gui.gui_wx.PasshphrasePanel":{OnClickClose:[4,3,1,""],OnClickOk:[4,3,1,""],OnEnter:[4,3,1,""]},"sync.gui.gui_wx.PassphraseDialog":{InitUI:[4,3,1,""],OnClickClose:[4,3,1,""],show:[4,6,1,""]},"sync.gui.gui_wx.PreferencesPanel":{OnChoice:[4,3,1,""]},"sync.gui.gui_wx.SharePanel":{create_share:[4,3,1,""],delete_share:[4,3,1,""],on_populate:[4,3,1,""],on_show:[4,3,1,""]},"sync.gui.gui_wx.SharesListCtrl":{populate:[4,3,1,""]},"sync.gui.gui_wx.SyncsPanel":{delete_localbox:[4,3,1,""],newSyncDialog:[4,3,1,""]},"sync.gui.gui_wx.UserListCtrl":{GetSelectedItemCount:[4,3,1,""],get_users:[4,3,1,""],populate:[4,3,1,""]},"sync.gui.taskbar":{LocalBoxIcon:[4,2,1,""],PassphraseHandler:[4,2,1,""],is_first_run:[4,4,1,""],passphrase_server:[4,4,1,""],taskbarmain:[4,4,1,""]},"sync.gui.taskbar.LocalBoxIcon":{OnTaskBarActivate:[4,3,1,""],OnTaskBarClick:[4,3,1,""],OnTaskBarClose:[4,3,1,""],create_popup_menu:[4,3,1,""],delete_decrypted:[4,3,1,""],icon_path:[4,5,1,""],start_gui:[4,3,1,""],start_sync:[4,3,1,""],stop_sync:[4,3,1,""]},"sync.gui.taskbar.PassphraseHandler":{do_GET:[4,3,1,""],get_label:[4,3,1,""]},"sync.gui.wizard":{LoginWizardPage:[4,2,1,""],NewPassphraseWizardPage:[4,2,1,""],NewSyncInputsWizardPage:[4,2,1,""],NewSyncWizard:[4,2,1,""],PassphraseWizardPage:[4,2,1,""]},"sync.gui.wizard.LoginWizardPage":{call_password_authentication:[4,3,1,""],layout_inputs:[4,3,1,""],passphrase_page:[4,3,1,""],password:[4,5,1,""],should_login:[4,3,1,""],username:[4,5,1,""]},"sync.gui.wizard.NewPassphraseWizardPage":{repeat_passphrase:[4,5,1,""],store_keys:[4,3,1,""]},"sync.gui.wizard.NewSyncInputsWizardPage":{is_authenticated:[4,3,1,""],label:[4,5,1,""],path:[4,5,1,""],select_localbox_dir:[4,3,1,""],url:[4,5,1,""],validate_new_sync_inputs:[4,3,1,""]},"sync.gui.wizard.PassphraseWizardPage":{add_new_sync_item:[4,3,1,""],passphrase:[4,5,1,""],store_keys:[4,3,1,""]},"sync.language":{set_language:[2,4,1,""]},"sync.localbox":{InvalidLocalBoxPathError:[2,1,1,""],InvalidLocalboxURLError:[2,1,1,""],LocalBox:[2,2,1,""],NoKeysFoundError:[2,1,1,""],create_key_and_iv:[2,4,1,""],getChecksum:[2,4,1,""],get_aes_key:[2,4,1,""],get_localbox_path:[2,4,1,""],remove_decrypted_files:[2,4,1,""]},"sync.localbox.LocalBox":{"delete":[2,3,1,""],authenticator:[2,5,1,""],call_keys:[2,3,1,""],call_user:[2,3,1,""],create_directory:[2,3,1,""],create_share:[2,3,1,""],decode_file:[2,3,1,""],delete_share:[2,3,1,""],encode_file:[2,3,1,""],get_all_users:[2,3,1,""],get_authentication_url:[2,3,1,""],get_file:[2,3,1,""],get_keys_path:[2,6,1,""],get_keys_path_v2:[2,6,1,""],get_meta:[2,3,1,""],get_share_list:[2,3,1,""],is_valid_url:[2,3,1,""],save_key:[2,3,1,""],upload_file:[2,3,1,""],username:[2,5,1,""]},"sync.metavfs":{MetaVFS:[2,2,1,""],normalize_path:[2,4,1,""]},"sync.metavfs.MetaVFS":{add_child:[2,3,1,""],add_paths:[2,3,1,""],contains_directory:[2,3,1,""],debug_print:[2,3,1,""],gen:[2,3,1,""],get_entry:[2,3,1,""],get_files:[2,3,1,""],get_paths:[2,3,1,""],load:[2,3,1,""],newest:[2,6,1,""],save:[2,3,1,""],yield_directories:[2,3,1,""],yield_files:[2,3,1,""]},"sync.models":{label_model:[5,0,0,"-"]},"sync.models.label_model":{delete_client_data:[5,4,1,""]},"sync.syncer":{MainSyncer:[2,2,1,""],StopSyncException:[2,1,1,""],SyncRunner:[2,2,1,""],Syncer:[2,2,1,""],get_syncers:[2,4,1,""]},"sync.syncer.MainSyncer":{is_running:[2,3,1,""],keep_running:[2,5,1,""],remove_runner:[2,3,1,""],run:[2,3,1,""],stop:[2,3,1,""],sync:[2,3,1,""],thread_pool:[2,5,1,""],waitevent:[2,5,1,""]},"sync.syncer.SyncRunner":{name:[2,5,1,""],run:[2,3,1,""],stop_event:[2,5,1,""]},"sync.syncer.Syncer":{"delete":[2,3,1,""],download:[2,3,1,""],get_file_path:[2,3,1,""],mkdir:[2,3,1,""],populate_filepath_metadata:[2,3,1,""],populate_localbox_metadata:[2,3,1,""],stop_event:[2,5,1,""],syncsync:[2,3,1,""]},sync:{auth:[2,0,0,"-"],controllers:[3,0,0,"-"],database:[2,0,0,"-"],defaults:[2,0,0,"-"],gpg:[2,0,0,"-"],gui:[2,0,0,"-"],language:[2,0,0,"-"],localbox:[2,0,0,"-"],metavfs:[2,0,0,"-"],models:[5,0,0,"-"],syncer:[2,0,0,"-"]}},objnames:{"0":["py","module","Python module"],"1":["py","exception","Python exception"],"2":["py","class","Python class"],"3":["py","method","Python method"],"4":["py","function","Python function"],"5":["py","attribute","Python attribute"],"6":["py","staticmethod","Python static method"]},objtypes:{"0":"py:module","1":"py:exception","2":"py:class","3":"py:method","4":"py:function","5":"py:attribute","6":"py:staticmethod"},terms:{"2ek":[],"byte":2,"case":7,"class":[2,3,4,8],"default":[],"final":12,"function":[2,4],"import":[8,11],"new":[],"public":[2,11],"return":[2,3,4],"static":[2,4],"switch":7,"true":[2,3,4],"try":[3,12],_control:4,_core:4,_window:4,abbrevi:3,abc:12,abl:[10,12],abrevi:3,access:12,account:12,account_ctrl:[],accountcontrol:3,accountpanel:4,add:[],add_child:2,add_keypair:2,add_new_sync_item:4,add_path:2,add_pkcs7_pad:2,add_public_kei:2,add_toolbar:4,address:12,addstretchablespac:8,administr:2,after:[7,11,12],again:7,against:2,agree:12,algorithm:2,alice:10,all:[2,8,11,12],allow:[0,9,11,12],alreadi:[2,4,12],alreadyauthenticatederror:2,also:[2,12],among:10,ani:[11,12],answer:12,api:[0,9],app:4,applic:[],applicat:11,apply:4,applyonclick:4,appropri:7,apt:7,arg:[2,4],argument:2,armor:2,ask:[8,11,12],ask_passphras:4,audit:[0,9],auth:[],authent:[0,2,8,9],authenticate_with_client_secret:2,authenticate_with_password:2,authentication_url:2,authenticationerror:2,author:2,avail:[0,2,9,11,12],backend:[0,2,9,11,12],base0:7,base:[2,3,4],basehttprequesthandl:4,basehttpserv:4,becaus:11,been:2,behav:4,belong:[2,11],between:[0,2,4,9,12],binari:2,binary_path:2,bit:2,both:[0,9],bottompanel:4,box:12,branch:7,bridg:4,bug:7,bugfix:7,build:7,button:[4,12],call:[2,4,7,11,12],call_kei:2,call_password_authent:4,call_us:2,can:[7,11,12],cancel:4,cannot:12,caption:4,care:4,caus:7,certain:2,charact:12,check:2,checklistctrlmixin:4,checkout:7,child:2,children:2,choic:7,choos:[7,12],chr:2,cklass:[],clean:7,clear:[],clearsigint:4,click:[4,12],client_address:4,clone:7,close:12,closeonclick:4,cloud:[0,9],code:[0,2,7,9],com:[7,12],command:2,common:[0,9],compil:7,complet:[0,9,12],complex:12,compon:4,comput:12,confidenti:[0,9],configerror:[],configpars:[],configur:[0,2,4,8,9,12],constant:[0,9],contain:[2,4],contains_directori:2,contempl:7,content:[],context:12,control:[],cool:7,creat:[],create_directori:2,create_key_and_iv:2,create_popup_menu:4,create_shar:[2,4],creator:12,credenti:[2,8,12],ctrl:4,current:7,custom:[2,4,11],cwd:4,daler:7,data:[0,2,9],databas:[],database_execut:2,databaseerror:2,debug:2,debug_print:2,decod:2,decode_fil:2,decrypt:[2,11,12],delet:[2,3,4,11,12],delete_client_data:5,delete_decrypt:4,delete_localbox:4,delete_shar:[2,4],depend:[],descript:[11,12],desktop:[0,2,9,11,12],destroi:4,detail:12,dev:7,develop:[],devic:12,dialog:4,dictionari:2,differ:[],differenti:2,dir:7,direct:[2,3],directli:12,directori:[2,11,12],disk:11,displai:7,do_get:4,doc:7,doe:3,don:12,done:[2,12],dpkg:7,each:[11,12],edg:7,edit:[11,12],encod:2,encode_fil:2,encrypt:[0,2,9,11,12],endwizard:[],entri:2,error:2,errorwindow:[],essenti:7,etc:[2,11],eupl:12,event:[2,4],eventu:11,everi:8,evt_right_down:4,except:[2,3],exception:[2,3],execut:[2,12],exist:[3,11],exit:[11,12],exit_button:[],extend:4,extract:[],fail:2,fals:[2,3,4],fdx:7,featur:[7,10],feel:12,field:11,file:[],file_root_path:2,filenam:[2,4],filepath:2,filesystem:2,filesystem_path:2,fingerprint:2,finish:12,first:[],firstloginpanel:4,flag:[],flow:7,folder:[11,12],folder_path:2,follow:8,forc:12,form:2,found:12,frame:4,free:[7,12],freeglut3:7,friendli:[0,9],from:[2,3,4,7,11,12],fs_path:2,ftp:[0,9],gen:2,gener:2,generate_client_id:2,generate_client_secret:2,get:[2,3,4,7,8,11,12],get_aes_kei:2,get_all_us:2,get_authentication_url:2,get_authorization_head:2,get_entri:2,get_fil:2,get_file_path:2,get_fingerprint:2,get_kei:2,get_keys_path:2,get_keys_path_v2:2,get_label:4,get_language_abbr:3,get_localbox:[],get_localbox_list:3,get_localbox_path:2,get_meta:2,get_passphras:3,get_password:4,get_path:2,get_share_list:2,get_sql_log_dict:2,get_sync:2,get_us:4,get_usernam:4,getchecksum:2,getselecteditemcount:4,gettext:3,gettoolbypo:8,git:[4,7],github:7,give:11,given:2,gnupg:2,goe:12,gpg:[],graphic:4,group:2,gui:[],gui_util:[],gui_wx:[],guid:7,guidelin:12,has_client_credenti:2,has_kei:2,hash:2,have:[11,12],head:7,header:2,here:[0,7,9,10,11,12],hide_before_login:4,highest:2,hold:[0,9],home:[2,4],host:2,hour:12,how:[4,7,12],html:7,http:[0,3,7,9,12],icon:[4,12],icon_path:4,iconpath:4,ident:11,identifi:[2,12],iklass:[],imag:[2,4],image_nam:4,images_path:4,implement:[0,2,9],importantli:8,includ:[2,10,12],includem:7,index:[3,7,13],init:4,init_authent:2,initi:2,initui:4,input:12,insid:[2,12],instal:[7,11,12],install:[7,12],instanc:[2,3,4],instruct:7,interfac:[4,12],invalid:2,invalidlocalboxerror:[],invalidlocalboxpatherror:2,invalidlocalboxurlerror:2,invalidpassphraseerror:3,invit:4,involv:12,is_authent:[2,4],is_dir:2,is_first_run:4,is_passphrase_valid:2,is_run:2,is_valid_input:4,is_valid_url:2,issue_number:7,item:[3,4],iter:2,itself:4,john:10,jpg:2,json:11,just:[4,12],keep:11,keep_run:2,kei:[2,7,8,11],keypair:2,know:12,knowledg:7,kwarg:[2,4],label:[2,3,4,5,12],label_model:[],lang:2,languag:[],languages:7,latest:[0,9],layout:8,layout_input:4,lazy_load:3,let:7,lib:4,libgstream:7,libgtk2:7,libjpeg:7,libnotifi:7,librari:2,libsdl1:7,libtiff:7,libwebkitgtk:7,like:[2,4,8,11],link:12,linwin:[4,7],list:[2,3,4,10,11,12],listctrl:4,listctrlautowidthmixin:4,ljust:2,load:[2,3,4],load_client_data:2,loauth:[0,2,9],local:[2,12],localbox_cli:[2,3,4],localbox_ctrl:[],localbox_inst:2,localbox_loc:2,localbox_path:[2,4],localboxapp:4,localboxicon:4,localboxinstal:12,localboxlistctrl:4,localboxsync:12,localhost:3,locat:[2,7],log:2,logged_in:3,login_ctrl:[],logincontrol:3,logindialog:4,loginpanel:4,loginwizardpag:4,look:12,lox_api:11,loxbox15:[0,9],loxcommon:[0,9],loxgui:7,loxlistctrl:4,lst:4,machin:[0,7,9],mai:2,mail:12,main:[4,12],main_syncing_thread:4,mainsync:2,make:[2,7],manag:[2,4,12],mani:11,match:7,mean:12,memori:3,menu:[4,12],mess:8,messag:[4,7,12],meta:2,metavf:[],metavfs:2,metavfs_entri:2,method:[4,8],metvf:2,microsoft:7,mime:[11,12],mimeapp:11,mimetyp:12,miss:8,mixin:4,mkdir:[2,7],mobil:[],mode:[11,12],model:[],modif:2,modifi:2,modified_at:2,modul:[],modulemanag:[],monitor:12,more:[7,8,12],must:[11,12],mybox:2,mysql:2,mysql_execut:2,name:[2,7,12],necessari:11,need:[2,4,7],newest:2,newpassphrasewizardpag:4,newsharedialog:4,newsharepanel:4,newsyncdialog:4,newsyncinputswizardpag:4,newsyncwizard:4,next_1:[],next_2:[],next_3:[],next_4:[],node:2,nokeysfounderror:2,none:[2,3,4],normalize_path:2,note:7,noth:4,now:[7,12],number:7,oauth2:[0,9],object:[2,3],obtain:11,occur:2,on_clos:4,on_popul:4,on_show:4,on_successful_login:4,onc:12,once:11,oncheckitem:[],onchoic:4,onclickclos:4,onclickok:4,one:2,onenter:4,oninit:4,onli:[4,8,11,12],only:12,onquit:4,ontaskbaractiv:4,ontaskbarclick:4,ontaskbarclos:4,ontoolbarlocalboxesclick:4,open:[0,7,8,9,11,12],oper:[11,12],option:[11,12],order:11,org:[0,9,12],origin:12,other:[2,12],other_label:3,otherwis:2,our:7,own:12,owner:[2,12],packag:[],pad:2,page:[7,13],pair:11,panel:4,param:[2,3],paramet:[2,3],parent:[2,4],part:2,partial:2,pass:2,passhphrasepanel:4,passhpras:8,passphras:[],passphrase_pag:4,passphrase_serv:4,passphrasedialog:4,passphrasehandl:4,passphrasewizardpag:4,password:[],password_authent:[],path:[2,3,4,12],paul:10,penguinformula:12,peopl:12,per:[2,8,11],period:12,permiss:12,permit:4,person:12,pip:7,pkcs:2,place:12,plugin:7,png:12,poedit:7,popul:4,populate_filepath_metadata:2,populate_list:4,populate_localbox_metadata:2,popup:4,possibl:12,pot:7,pref:3,prefer:3,preferences_ctrl:[],preferencescontrol:3,preferencespanel:4,present:2,previou:7,previous:12,pring:2,prior:12,privaci:[0,9],privat:[2,8,11],private_kei:2,privkei:3,problem:2,process:[11,12],program:12,progress:12,prompt:8,proper:2,protect:[8,11,12],provid:[0,9,12],pubkei:3,public_kei:[2,11],push:12,pycrypto:12,pysync:[4,7],python2:7,question:[],read:[4,11,12],readi:[4,7],real:4,reboot:12,receiv:[2,3,11,12],recommend:12,redirect:4,ref:7,refer:7,regist:11,rel:[2,12],releas:10,remot:[3,12],remov:[2,12],remove_decrypted_fil:2,remove_path_prefix:[],remove_pkcs7_pad:2,remove_runn:2,repeat_passphras:4,repeatedli:11,replac:[2,7],repo:7,repres:[2,12],request:4,requir:4,resourc:[],respons:[2,11],rest:4,restart:7,result:2,right:[2,12],root:12,run:[2,4,11,12],same:[11,12],santo:12,save:[2,3,4,7],save_client_data:2,save_kei:2,scenario:7,search:13,secret:2,section:11,secur:[],see:12,select:12,select_dir:4,select_directori:4,select_localbox_dir:4,selected_localbox:4,send:[4,12],send_data:2,serv:12,server:[0,2,4,9,11,12],server_url:[],servic:11,set:[2,11],set_languag:2,setup:12,setup_passphrase_panel:[],share_id:2,sharepanel:4,shareslistctrl:4,should:[2,7,12],should_creat:2,should_login:4,show:4,show_confirm_dialog:4,show_error_dialog:4,show_first_panel:4,signifi:2,signum:[],sinc:12,singl:[2,4],site:[2,4],siteslist:[],size:12,softwar:[0,9,12],solut:[0,9],solv:7,some:[7,8],some_cont:2,some_fold:2,somehow:11,sourc:[0,9],spec:7,special:12,sphinxdoc:7,sql:2,sqlite:2,sqlite_execut:2,standalon:4,start:[],start_gui:4,start_sync:4,statement:2,stop:[2,12],stop_ev:2,stop_sync:4,stopsyncexcept:2,store:[0,9,11,12],store_kei:[3,4],store_passphras:3,string:[2,7],stronger:2,structur:2,submodul:[],subpackag:[],substitut:2,success:2,sudo:[7,11,12],sure:[2,4],symbol:7,symmetr:2,sync_list_ctrl:4,syncer:[],synchron:[0,2,9,11,12],syncitem:3,syncrunn:2,syncscontrol:3,syncspanel:4,syncsync:2,system:[2,4,8,11,12],tab:12,take:4,target:2,taskbar:[],taskbaricon:4,taskbarmain:4,tbmenu_change:[],tbmenu_close:[],tbmenu_delete_decrypted:[],tbmenu_gui:[],tbmenu_remove:[],tbmenu_restore:[],tbmenu_stop:[],tbmenu_sync2:[],tbmenu_sync:[],tbmenu_version:[],tell:4,test:[],testlistctrl:[],text:7,than:12,thei:[8,11,12],them:[7,10,11,12],thi:[0,2,4,7,8,9,11,12],those:[0,9],thread:2,thread_pool:2,three:2,time:[2,8,11,12],titl:4,tkinter:[],todo:[],tool:7,toolbar:8,topwindow:[],track:11,trai:12,translat:[],translatefil:7,tupl:2,two:2,txt:2,type:[11,12],understand:12,understood:11,unencrypt:12,uninstal:12,unreach:2,updat:7,upload:[2,12],upload_fil:2,upon:11,upper:7,url:[2,3,4,12],use:12,usebestvisu:4,user_list:2,userlistctrl:4,usernam:[2,4,8,11],using:12,usr:[11,12],validate_new_sync_input:4,validate_serv:[],valu:[2,4,7],variabl:2,verbos:[],version:[],via:[3,7],virtual:2,virtualbox:7,virtualenv:7,wait:12,waitev:2,want:[4,7,10,11],warning_no_database_sect:2,well:12,what:[],when:[2,4,8,11,12],where:7,whether:2,which:12,who:12,whose:12,widget:4,wilson:[2,4,12],window1:[],window2:[],window3:[],window:[],wish:12,within:[0,9],without:[2,7],wizard:[],wizardpagesimpl:4,won:12,work:11,workflow:11,wrap:2,write:12,wx_event:4,wxpython:12,wxwidget:4,xdg:[11,12],xml:[11,12],xxx:12,yep:12,yield_directori:2,yield_fil:2,you:[0,4,7,8,9,12],your:[],yourlocalbox:[0,7,9,12]},titles:["Localbox Sync Client","sync","sync package","sync.controllers package","sync.gui package","sync.models package","sync.resources package","Contributions","Frequently Asked Questions","Localbox Sync Client","Next Steps","Specification","User Manual","Welcome to LoxPySync&#8217;s documentation!"],titleterms:{"default":2,"new":[7,12],account_ctrl:3,add:12,adding:7,applic:7,asked:8,auth:2,client:[0,9,11],content:[2,3,4,5,6],contribut:7,control:3,creat:[7,12],databas:2,depend:7,develop:7,differ:8,document:[0,7,9,13],download:[0,9],encryption:11,explain:12,explane:[],extens:11,file:[10,11,12],first:12,frequent:8,gpg:2,gui:[2,4],gui_util:4,gui_wx:4,indice:13,installat:12,label_model:5,languag:2,limit:12,linux:11,localbox:[0,2,9,12],localbox_ctrl:3,login_ctrl:3,lox:11,loxpysync:13,manual:12,metavf:2,model:5,modul:[2,3,4,5,6],next:10,packag:[2,3,4,5,6],passphras:8,password:8,preferences_ctrl:3,project:[0,9],question:8,relat:[0,9],resourc:6,secur:12,share:[10,11,12],side:11,specif:11,start:7,step:10,submodul:[2,3,4,5],subpackag:[2,6],sync:[0,1,2,3,4,5,6,9,12],syncer:2,tabl:13,taskbar:4,test:7,translat:7,ubuntu:12,update:7,user:12,version:2,welcom:13,what:8,why:[0,8,9],window:[7,12],wizard:[2,4],wxpython2:8,wxpython3:8,your:12}})