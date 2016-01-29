<?php
/*=========================================================================

  Program:   CDash - Cross-Platform Dashboard System
  Module:    $Id$
  Language:  PHP
  Date:      $Date$
  Version:   $Revision$

  Copyright (c) 2002 Kitware, Inc.  All rights reserved.
  See Copyright.txt or http://www.cmake.org/HTML/Copyright.html for details.

     This software is distributed WITHOUT ANY WARRANTY; without even
     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR
     PURPOSE.  See the above copyright notices for more information.

=========================================================================*/

require_once(dirname(dirname(dirname(__DIR__)))."/config/config.php");
require_once("include/common.php");
require_once("include/pdo.php");

$md5sums_get = isset($_GET['md5sums']) ? htmlspecialchars(pdo_real_escape_string($_GET['md5sums'])) : '';
if ($md5sums_get == '') {
    echo "md5sum not specified";
    return;
}

$md5sums = preg_split('#[|.:,;]+#', $md5sums_get);

foreach ($md5sums as $md5sum) {
    if ($md5sum == '') {
        continue;
    }
    $md5sum = pdo_real_escape_string($md5sum);
    $result = pdo_query("SELECT id FROM filesum WHERE md5sum='$md5sum'");
  //we don't have this file, add it to the list to send
  if (pdo_num_rows($result) == 0) {
      echo $md5sum . "\n";
  }
}
