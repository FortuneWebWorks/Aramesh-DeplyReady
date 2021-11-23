<?php

namespace App\Http\Controllers;

use App\Models\Result;
use Illuminate\Http\Request;
use Mockery\Undefined;

class ResultController extends Controller
{

    public function results(Request $request, $role) 
    {
        $member = request()->user()->members()->where('role', $role)->first();




        if(sizeof(request()->user()->members()->where('role', $role)->first()->results()->get()) <= 0) {
            // Reverse answers
            $member->answers()->each(function($item, $key) {
                $fields = $item->only(['q1', 'q3', 'q4', 'q5', 'q6' ,'q7' ,'q8' ,'q9', 'q10', 'q11', 'q12', 'q18', 'q20', 'q21', 'q22', 'q23' ,'q24', 'q25', 'q27', 'q28', 'q31', 'q32', 'q33', 'q37', 'q38', 'q39', 'q43', 'q45', 'q46', 'q58', 'q66', 'q67', 'q68', 'q69', 'q70', 'q71', 'q72', 'q73', 'q74', 'q75', 'q78' ]);

                foreach($fields as $index => $field) {
                    $fields[$index] = 6 - $field;
                }
                foreach($fields as $index => $data) {
                    $item[$index] = $data;
                }
                $item->save();
            });
            $member->answers()->each(function($answer, $key) use($member) {
            
                $result =  $member->results()->make();
                $result->content = number_format(ResultController::avg(ResultController::arrayMaker(1, 38, $answer)), 2, '.', '');
                $result->process = number_format(ResultController::avg(ResultController::arrayMaker(39, 81, $answer)), 2, '.', '');
                $array = ResultController::arrayMaker(20, 24, $answer);
                $array['q28'] = $answer['q28'];
                $result->je = number_format(ResultController::avg($array), 2, '.', '');
                $array = ResultController::arrayMaker(6, 9, $answer);
                $array['q11'] = $answer['q11'];
                $array['q12'] = $answer['q12'];
                $result->tt = number_format(ResultController::avg($array), 2, '.', '');
                $result->fs = number_format(ResultController::avg(ResultController::arrayMaker(1, 5, $answer)), 2, '.', '');
                $array = ResultController::arrayMaker(13, 16, $answer);
                $array['q18'] = $answer['q18'];
                $array['q19'] = $answer['q19'];
                $result->ap = number_format(ResultController::avg($array), 2, '.', '');
                $result->pp = number_format(ResultController::avg(ResultController::arrayMaker(34, 38, $answer)), 2, '.', '');
                $result->ls = number_format(ResultController::avg(ResultController::arrayMaker(31, 33, $answer)), 2, '.', '');
                $result->ef = number_format(ResultController::avg(ResultController::arrayMaker(25, 27, $answer)), 2, '.', ''); 
                $result->ps = number_format(ResultController::avg(ResultController::arrayMaker(66, 75, $answer)), 2, '.', ''); 
                $result->cstra = number_format(ResultController::avg(ResultController::arrayMaker(54, 64, $answer)), 2, '.', ''); 
                $array = ResultController::arrayMaker(47, 53, $answer);
                $array['q40'] = $answer['q40'];
                $array['q41'] = $answer['q41'];
                $array['q42'] = $answer['q42'];
                $result->rfc = number_format(ResultController::avg($array), 2, '.', ''); 
                $array = ResultController::arrayMaker(43, 55, $answer);
                $array['q39'] = $answer['q39'];
                $array['q41'] = $answer['q41'];
                $result->cs = number_format(ResultController::avg($array), 2, '.', ''); 
                $result->rb = number_format(ResultController::avg(ResultController::arrayMaker(76, 81, $answer)), 2, '.', '');
                $result->save();
            
            });
        };

        
        $tableData = array(
            'paretParent' => array(),
            'parentChild' => array(),
            'childChild' => array(),
        );
        $integrations = array();

        // Check if all the family parts took the test
        if(request()->user()['tests-taken'] == true && sizeof(request()->user()->integrations()->get()) <= 0) {

           // Seperating parents from children
            $parents = array();
            $children = array();
            $members = request()->user()->members()->get();
            if(request()->user()['both-parents']) {
                foreach($members as $index => $member) {
                    if(str_contains($member->role, 'پدر')) {
                        array_push($parents, $member);
                    }
                }
                foreach($members as $index => $member) {
                    if(str_contains($member->role, 'مادر')) {
                        array_push($parents, $member);
                    } else if(str_contains($member->role, 'فرزند')) {
                        array_push($children, $member);
                    }
                }
            } else {
                foreach($members as $index => $member) {
                    if(str_contains($member->role, 'پدر') || str_contains($member->role, 'مادر')) {
                        array_push($parents, $member);
                    } else {
                        array_push($children, $member);
                    }
                }
            }

            // Calculating deltap and deltac
            $data = array();

            if(sizeof($parents) >= 2) {
                $data = array(
                    'parents' => array('F', 'M'),
                );
            } else {
                if(str_contains($parents[0]->role, 'پدر')) {
                    $data = array(
                        'parents' => array('F'),
                    );
                } else if(str_contains($parents[0]->role, 'مادر')) {
                    $data = array(
                        'parents' => array('M'),
                    );
                }
            }
            

            if (sizeof($parents) >= 2) {
                for ($i = 0; $i < sizeof($parents); $i++) {
                    for ($j = $i + 1; $j < sizeof($parents); $j++) {
                        $tableData['paretParent'][$data['parents'][$i].'/'.$data['parents'][$j]]['deltap'] = 
                        $parents[$i]->results()->first()['process'] - $parents[$j]->results()->first()['process'];
                        $tableData['paretParent'][$data['parents'][$i].'/'.$data['parents'][$j]]['deltac'] = 
                        $parents[$i]->results()->first()['content'] - $parents[$j]->results()->first()['content'];
                    }
                }
            }
            
            for ($i = 0; $i < sizeof($parents); $i++) {
                for ($j = 0; $j < sizeof($children); $j++) {
                    // $tableData->parentChild.push(`${data.parents[$i]}/${data.children[$j]}`);
                    $childName = ResultController::childNumber($children[$j]['role']);

                    $tableData['parentChild'][$data['parents'][$i].'/'.$childName]['deltap'] = 
                    $parents[$i]->results()->first()['process'] - $children[$j]->results()->first()['process'];

                    $tableData['parentChild'][$data['parents'][$i].'/'.$childName]['deltac'] = 
                    $parents[$i]->results()->first()['content'] - $children[$j]->results()->first()['content'];
                }
            }
            
            for ($i = 0; $i < sizeof($children); $i++) {
                for ($j = $i + 1; $j < sizeof($children); $j++) {
                    // $tableData->childChild.push(`${data.children[$i]}/${data.children[$j]}`);
                    $childName1 = ResultController::childNumber($children[$i]['role']);
                    $childName2 = ResultController::childNumber($children[$j]['role']);
                    $tableData['childChild'][$childName1.'/'.$childName2]['deltap'] = 
                    $children[$i]->results()->first()['process'] - $children[$j]->results()->first()['process'];

                    $tableData['childChild'][$childName1.'/'.$childName2]['deltac'] = 
                    $children[$i]->results()->first()['content'] - $children[$j]->results()->first()['content'];
                    
                }
            } 
            
            // Calculating Integration
            
            foreach($tableData as $group) {
                foreach($group as $integrationName => $integrationData) {
                    $integration = 5.656 - sqrt(pow($integrationData['deltap'], 2) + pow($integrationData['deltac'], 2));
                    $integrations[$integrationName] = (($integration * 4) / 5) + 1;
                }
            }

            $familyIntegration = 0;
            foreach($integrations as $IntegrationValue) {
                $familyIntegration += $IntegrationValue;
            }
            $familyIntegration /= sizeof($integrations);

            foreach($integrations as $index => $IntegrationValue) {
                request()->user()->integrations()->create([
                    'role' => $index,
                    'integration' => number_format($IntegrationValue, 2, '.', ''),
                    'family-integration' => number_format($familyIntegration, 2, '.', '')
                ]);
            }
        }

        $users = request()->user();
        foreach($users->members()->get() as $user) {
            if($user->tested == false) {
                return redirect()->route('test-retain', [
                    'person' => 'parent',
                    'member' => 'پدر'
                ]);
            }
        }
        return redirect()->route('test-completed', [
            'person' => 'parent',
            'member' => 'پدر'
        ]);

    }

    static function arrayMaker($start, $end, $object) {
        $array = array();
        for($i = $start ; $i <= $end ; $i++) {
            $array['q'.$i] = $object['q'.$i];
        }
        return $array;
    }

    static function avg($array) {
        $content = 0;
        foreach($array as $index => $value) {
            $content += $value;
        }
        $content = $content / sizeof($array);
        return $content;
    }

    static function childNumber($childRole) {
        $names = array(
            "اول","دوم","سوم","چهارم",
            "پنجم","ششم","هفتم","هشتم",
            "نهم","دهم","یازدهم","دوازدهم",
            "سیزدهم","چهاردهم","پانزدهم","شانزدهم",
            "هفدهم","هجدهم","نوزدهم","بیستم",
        );

        foreach($names as $index => $name) {
            if(str_contains($childRole, $name)) {
                return 'C' . ($index + 1);
            }
        }

    }

}
