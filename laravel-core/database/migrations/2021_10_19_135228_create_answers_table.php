<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id();
            $table->integer('q1');
            $table->integer('q2');
            $table->integer('q3');
            $table->integer('q4');
            $table->integer('q5');
            $table->integer('q6');
            $table->integer('q7');
            $table->integer('q8');
            $table->integer('q9');
            $table->integer('q10');
            $table->integer('q11');
            $table->integer('q12');
            $table->integer('q13');
            $table->integer('q14');
            $table->integer('q15');
            $table->integer('q16');
            $table->integer('q17');
            $table->integer('q18');
            $table->integer('q19');
            $table->integer('q20');
            $table->integer('q21');
            $table->integer('q22');
            $table->integer('q23');
            $table->integer('q24');
            $table->integer('q25');
            $table->integer('q26');
            $table->integer('q27');
            $table->integer('q28');
            $table->integer('q29');
            $table->integer('q30');
            $table->integer('q31');
            $table->integer('q32');
            $table->integer('q33');
            $table->integer('q34');
            $table->integer('q35');
            $table->integer('q36');
            $table->integer('q37');
            $table->integer('q38');
            $table->integer('q39');
            $table->integer('q40');
            $table->integer('q41');
            $table->integer('q42');
            $table->integer('q43');
            $table->integer('q44');
            $table->integer('q45');
            $table->integer('q46');
            $table->integer('q47');
            $table->integer('q48');
            $table->integer('q49');
            $table->integer('q50');
            $table->integer('q51');
            $table->integer('q52');
            $table->integer('q53');
            $table->integer('q54');
            $table->integer('q55');
            $table->integer('q56');
            $table->integer('q57');
            $table->integer('q58');
            $table->integer('q59');
            $table->integer('q60');
            $table->integer('q61');
            $table->integer('q62');
            $table->integer('q63');
            $table->integer('q64');
            $table->integer('q65');
            $table->integer('q66');
            $table->integer('q67');
            $table->integer('q68');
            $table->integer('q69');
            $table->integer('q70');
            $table->integer('q71');
            $table->integer('q72');
            $table->integer('q73');
            $table->integer('q74');
            $table->integer('q75');
            $table->integer('q76');
            $table->integer('q77');
            $table->integer('q78');
            $table->integer('q79');
            $table->integer('q80');
            $table->integer('q81');
            $table->timestamps();
            $table->foreignId('member_id')->references('id')->on('members')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
