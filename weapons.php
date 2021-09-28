
<?php include( 'page-components/header.php' ); ?>

<div class="page-weapons">
    <div class="ov-main-container uk-container uk-container-small uk-position-relative uk-height-viewport">
        <div>
            <h1 class="uk-text-center uk-text-bold uk-text-uppercase uk-margin-large-top uk-margin-large-bottom">Weapon List</h1>
        </div>
        <div class="ov-item-list">
            <table class="sticky uk-table" uk-sticky>
                <thead>
                    <tr>
                        <th>Weapon</th>
                        <th></th>
                        <th>ATK</th>
                        <th>DB</th>
                        <th>RT</th>
                        <th>Wt</th>
                        <th>R</th>
                        <th></th>
                        <th>H</th>
                        <th>Lv</th>
                    </tr>
                </thead>
            </table>
            <table id="itemList" class="uk-table uk-margin-remove-top">
                <thead>
                    <tr class="divide-header">
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
            </table>

            <!--<div id="loading" uk-modal>-->
                <!--<div class="frame uk-position-center">-->
                    <!--<span id="progress"></span>-->
                <!--</div>-->
            <!--</div>-->
        </div>
    </div>

    <div id="sidePanel" class="weapons-panel">
        <div class="panel">
            <button id="panelClose"></button>
            <div class="content">
                <div class="title uk-width-1-1">
                    <div class="uk-float-right uk-text-right">
                        <span class="level">—</span><br>
                    </div>
                    <h2>—</h2>
                    <h5><span class="uk-icon"><img data-src="" uk-img></span> <i>—</i></h5>
                </div>
                <div class="stats-top uk-width-1-1">
                    <div class="basic uk-grid-collapse" uk-grid>
                        <div class="uk-width-1-2">
                            <ul>
                                <li><span>Scaling: </span><b class="scaling">—</b></li>
                                <li><span>Attack: </span><b class="attack">—</b></li>
                                <li><span>Accuracy: </span><b class="accuracy">—</b></li>
                            </ul>
                        </div>
                        <div class="uk-width-1-2 uk-text-right">
                            <ul>
                                <li><span>Weight: </span><b class="weight">—</b></li>
                                <li><span>RT Cost: </span><b class="rtcost">—</b></li>
                                <li><span>Range: </span><b class="range">—</b></li>
                            </ul>
                        </div>
                    </div>
                    <div class="damage uk-grid-collapse" uk-grid>
                        <div class="damage-type uk-width-1-3">
                            <img data-src="img/icons/damage-pierce.png" width="40" height="40" uk-img>
                            <br>
                            <b>—</b>
                        </div>
                        <div class="damage-element uk-width-1-3">
                            <img data-src="img/icons/damage-air.png" width="40" height="40" uk-img>
                        </div>
                        <div class="damage-race uk-width-1-3">
                            <img data-src="img/icons/damage-human.png" width="40" height="40" uk-img>
                            <br>
                            <b>40%</b>
                        </div>
                    </div>
                    <div class="on-hit">
                        <table>
                            <tr>
                                <td>
                                    <span>On Hit: </span>
                                </td>
                                <td>
                                    <small><b class="on-hit-eff">—</b></small>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                <hr>
                <div class="stats-bottom uk-width-1-1">
                    <div class="uk-grid-collapse" uk-grid>
                        <div class="uk-width-1-2">
                            <ul>
                                <li><span>ATK: </span><b>—</b></li>
                                <li class="defense"><span>DEF: </span><b>—</b></li>
                                <li class="obsatk"><span>Obstacle ATK: </span><b>—</b></li>
                                <li><span class="uk-margin-small-top">HP: </span><b>—</b></li>
                                <li><span>MP: </span><b>—</b></li>
                                <li><span class="uk-margin-small-top">Luck: </span><b>—</b></li>
                            </ul>
                        </div>
                        <div class="uk-width-1-2 uk-text-right">
                            <ul>
                                <li><span>STR: </span><b>—</b></li>
                                <li><span>VIT: </span><b>—</b></li>
                                <li><span>DEX: </span><b>—</b></li>
                                <li><span>AGI: </span><b>—</b></li>
                                <li><span>AVD: </span><b>—</b></li>
                                <li><span>INT: </span><b>—</b></li>
                                <li><span>MND: </span><b>—</b></li>
                                <li><span>RES: </span><b>—</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="stats-extra uk-width-1-1">
                    <ul>
                        <li><span>Skill Bonus: </span><b class="skillbon">—</b></li>
                        <li><span>Passive Bonus: </span><b class="passive">—</b></li>
                        <li><span>Use Effect: </span><b class="ability">—</b></li>
                        <li class="itemset"><span>Equipment Set: </span><b>—</b></li>
                    </ul>
                </div>
                <hr>
                <div class="notes uk-width-1-1">
                    <table>
                        <tr>
                            <td>
                                <span>Obtain: </span>
                            </td>
                            <td>
                                <small><b class="location">—</b></small>
                            </td>
                        </tr>
                        <tr class="ingredients">
                            <td colSpan="2">
                                <ul uk-accordion>
                                    <li>
                                        <a class="uk-accordion-title" href="#">Ingredients</a>
                                        <div class="uk-accordion-content">
                                            <ul>
                                                <li><span>Skill Bonus</span><b>x2</b></li>
                                            </ul>
                                        </div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr class="note">
                            <td>
                                <span>Notes: </span>
                            </td>
                            <td>
                                <small><b>—</b></small>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="class uk-width-1-1">
                    <ul uk-accordion>
                        <li>
                            <a class="uk-accordion-title" href="#">Class List</a>
                            <div class="uk-accordion-content">
                                <ul>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="js/weapons.js" type="text/javascript"></script>

<?php include( 'page-components/footer.php' ); ?>

